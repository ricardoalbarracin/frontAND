import { Injectable } from '@angular/core';
import { MinsaludConsultaModule } from '../minsalud-consulta.module';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { TipoListaModel } from '../models/TipoListaModel';
import { MinsaludFiltroModel } from '../models/MinsaludFiltroModel';
import { MinsaludDetalleModel } from '../models/MinsaludDetalleModel';
import { GovcoTableModel, TableCellModel, TableConfigModel } from '@shared/forms/models/table.model';
import { PrestadoresDetalleModalComponent } from '../components/prestadores/prestadores-detalle-modal/prestadores-detalle-modal.component';
import { SedesDetalleModalComponent } from '../components/sedes/sedes-detalle-modal/sedes-detalle-modal.component';
import { ServiciosDetalleModalComponent } from '../components/servicios/servicios-detalle-modal/servicios-detalle-modal.component';
import { CapacidadDetalleModalComponent } from '../components/capacidad/capacidad-detalle-modal/capacidad-detalle-modal.component';
import { SeguridadDetalleModalComponent } from '../components/seguridad/seguridad-detalle-modal/seguridad-detalle-modal.component';
import { SancionesDetalleModalComponent } from '../components/sanciones/sanciones-detalle-modal/sanciones-detalle-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MinsaludModalUtilService } from './minsalud-modal-util.service';

@Injectable({
  providedIn: 'root'
})
export class MinsaludConsultaUtilService {

  public isChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public tDetail: GovcoTableModel;

  public mostrarDetalle: any;
  public mostrarDetalleSinResultados: any;
  public descargaCompleta: any;
  public cantidadRegistros: any;
  public cantidadRegistrosOtro: any;

  invalidForm = false;
  public invalidRecaptcha = false;

  opciones: string[] = ['Prestadores','Sedes','Servicios','Capacidad','Medidas de seguridad','Sanciones'];
 
  opcionSeleccionada = this.opciones[0];

  idsTablaPrestadores:  string[] = ['id','departamento_prestador','municipio_prestador', 'codigo_prestador','nombre_prestador','direccion','telefono'];
  idsTablaSedes:        string[] = ['id', 'departamento_prestador','municipio_prestador','codigo_prestador','nombre_prestador','codigo_sede','sede_principal','nombre_sede', 'zona','direccion','telefono'];
  idsTablaServicios:    string[] = ['id', 'departamento_prestador','municipio_prestador','codigo_sede','nombre_sede'     ,'serv_nombre','numero_distintivo'];
  idsTablaCapacidad:    string[] = ['id', 'departamento_prestador','municipio_prestador','codigo_sede','sede_principal','nombre_sede','grupo_capacidad','cantidad','numero_placa','modalidad','modelo','numero_tarjeta'];
  idsTablaSeguridad:    string[] = ['id','departamento_prestador','municipio_prestador','codigo_sede','sede_principal','nombre_sede','serv_nombre','numero_distintivo'];
  idsTablaSanciones:    string[] = ['id', 'departamento_prestador','municipio_prestador','codigo_sede','sede_principal','nombre_sede','serv_nombre','numero_distintivo'];  

  //Se declaran de manera global las listas
  tipoListaModel: TipoListaModel;
  listaTmp: SelectListItemModel[];
  listaNaturalezaJuridica: SelectListItemModel[];
  listaCaracterTerritorial: SelectListItemModel[];
  listaClasePrestador: SelectListItemModel[];
  listaConcepto: SelectListItemModel[];
  listaDepartamento: SelectListItemModel[];
  listaEmpresaSocialEstado: SelectListItemModel[];
  listaGrupo: SelectListItemModel[];
  listaMunicipio: SelectListItemModel[];
  listaMunicipioFiltrado: SelectListItemModel[];
  listaMunicipioFiltrado2: SelectListItemModel[];
  listaNivelAtencionPrestador: SelectListItemModel[];
  listaNombreServicio: SelectListItemModel[];
  listaSedePrincipal: SelectListItemModel[];
  listaZona: SelectListItemModel[];


  filtro: MinsaludFiltroModel;
  filtroTmp: MinsaludFiltroModel;

  detalleConsulta: MinsaludDetalleModel[];
  registroSeleccionado: MinsaludDetalleModel;
  

  constructor(private router: Router, 
              private http: HttpClient,
              public modalService: NgbModal,
              private minsaludModal: MinsaludModalUtilService) {
    this.cantidadRegistros=0;
    this.cantidadRegistrosOtro=0;
    this.inicializarFiltro();
    this.inicializarRegistroSeleccionado();
  }

  public urlTramite = {
    listas: 'minsalud/ConsultaPrestadores/listas',
    detalle: 'minsalud/ConsultaPrestadores/detalle',
    detalleExcel: 'minsalud/ConsultaPrestadores/detalleExcel',
  };

  private tipoLista = {
    naturalezaJuridica: 'naturaleza_juridica',
    caracterTerritorial: 'caracter',
    clasePrestador: 'clase_prestador',
    concepto: 'concepto',
    departamento: 'Departamentos',
    empresaSocialEstado: 'ESE',
    grupo: 'grupo_servicio',
    municipio: 'Municipios',
    nivelAtencionPrestador: 'nivel',
    nombreServicio: 'Servicio',
    sedePrincipal: 'SedePrincipal',
    zona: 'zona'
  };

  public tipoDetalle = {
    prestadores: 'Habilitados',
    sedes: 'Sedes',
    servicios: 'Servicios',
    capacidad: 'Capacidad',
    seguridad: 'Medidas',
    sanciones: 'Sanciones'
  };

  //Retorna la bandera si selecciona detalle o no
  public getMostrarDetalle(name: string): string {
    return this.mostrarDetalle;
  }

  public asignarMostrarDetalle(mostrarDetalleParam){
    this.mostrarDetalle=mostrarDetalleParam;
    return this.mostrarDetalle;
  }

  public asignarMostrarDetalleSinResultados(mostrarDetalleSinResultadosParam){
    this.mostrarDetalleSinResultados=mostrarDetalleSinResultadosParam;
    return this.mostrarDetalleSinResultados;
  }

  public asignarDescargaCompleta(descargaCompletaParam){
    this.descargaCompleta=descargaCompletaParam;
    return this.descargaCompleta;
  }


  public cargarListasPrestadores(){
    this.getListaNaturalezaJuridica();
    this.getListaDepartamento();
    this.getListaMunicipio();
    this.getListaClasePrestador();
    this.getListaEmpresaSocialEstado();
    this.getListaNivelAtencionPrestador();
    this.getListaCaracterTerritorial();
  }

  public cargarListasSedes(){
    this.getListaNaturalezaJuridica();
    this.getListaDepartamento();
    this.getListaMunicipio();
    this.getListaClasePrestador();
    this.getListaEmpresaSocialEstado();
    this.getListaNivelAtencionPrestador();
    this.getListaCaracterTerritorial();
    this.getListaSedePrincipal();
    this.getListaZona();
  }

  public cargarListasServicios(){
    this.getListaNaturalezaJuridica();
    this.getListaGrupo();
    this.getListaNombreServicio();
    this.getListaDepartamento();
    this.getListaMunicipio();
    this.getListaClasePrestador();
    this.getListaEmpresaSocialEstado();
    this.getListaNivelAtencionPrestador();
    this.getListaCaracterTerritorial();
  }

  public cargarListasCapacidad(){
    this.getListaNaturalezaJuridica();
    this.getListaGrupo();
    this.getListaConcepto();
    this.getListaDepartamento();
    this.getListaMunicipio();
    this.getListaClasePrestador();
    this.getListaEmpresaSocialEstado();
    this.getListaNivelAtencionPrestador();
    this.getListaCaracterTerritorial();
  }

  // public cargarListasSeguridad(){
  //   this.getListaNaturalezaJuridica();
  //   this.getListaGrupo();
  //   this.getListaNombreServicio();
  //   this.getListaDepartamento();
  //   this.getListaMunicipio();
  //   this.getListaClasePrestador();
  //   this.getListaEmpresaSocialEstado();
  //   this.getListaNivelAtencionPrestador();
  //   this.getListaCaracterTerritorial();
  // }


  public cargarListasSanciones(){
    this.getListaNaturalezaJuridica();
    this.getListaGrupo();
    this.getListaNombreServicio();
    this.getListaDepartamento();
    this.getListaMunicipio();
    this.getListaSedePrincipal();
    this.getListaZona();
    this.getListaClasePrestador();
    this.getListaNivelAtencionPrestador();
    this.getListaCaracterTerritorial();
  }


  public cargarListas(){
    this.getListaNaturalezaJuridica();
    this.getListaCaracterTerritorial();
    this.getListaClasePrestador();
    this.getListaConcepto();
    this.getListaDepartamento();
    this.getListaEmpresaSocialEstado();
    this.getListaGrupo();
    this.getListaMunicipio();
    this.getListaNivelAtencionPrestador();
    this.getListaNombreServicio();
    this.getListaSedePrincipal();
    this.getListaZona();
  }

  public getListaNaturalezaJuridica() {
    this.getListas_modificada(this.tipoLista.naturalezaJuridica).subscribe(
      // Success response
      response => {
        this.listaNaturalezaJuridica = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaCaracterTerritorial() {
    this.getListas_modificada(this.tipoLista.caracterTerritorial).subscribe(
      // Success response
      response => {
        this.listaCaracterTerritorial = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaClasePrestador(){
    this.getListas_modificada(this.tipoLista.clasePrestador).subscribe(
      // Success response
      response => {
        this.listaClasePrestador = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }
  
  getListaConcepto(){
    this.getListas_modificada(this.tipoLista.concepto).subscribe(
      // Success response
      response => {
        this.listaConcepto = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaDepartamento(){
    this.getListas_modificada(this.tipoLista.departamento).subscribe(
      // Success response
      response => {
        this.listaDepartamento = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaEmpresaSocialEstado(){
    this.getListas_modificada(this.tipoLista.empresaSocialEstado).subscribe(
      // Success response
      response => {
        this.listaEmpresaSocialEstado = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaGrupo(){
    this.getListas_modificada(this.tipoLista.grupo).subscribe(
      // Success response
      response => {
        this.listaGrupo = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaMunicipio(){
    this.getListas_modificada(this.tipoLista.municipio).subscribe(
      // Success response
      response => {
        this.listaMunicipio = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaNivelAtencionPrestador(){
    this.getListas_modificada(this.tipoLista.nivelAtencionPrestador).subscribe(
      // Success response
      response => {
        this.listaNivelAtencionPrestador = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaNombreServicio(){
    this.getListas_modificada(this.tipoLista.nombreServicio).subscribe(
      // Success response
      response => {
        this.listaNombreServicio = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaSedePrincipal(){
    this.getListas_modificada(this.tipoLista.sedePrincipal).subscribe(
      // Success response
      response => {
        this.listaSedePrincipal = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getListaZona(){
    this.getListas_modificada(this.tipoLista.zona).subscribe(
      // Success response
      response => {
        this.listaZona = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  // Cargar listas (Operadores - Peridos)
  public getListas_modificada(tipoListaParam: string) {
    this.tipoListaModel = {"valor":tipoListaParam};
    return this.http.post<SelectListItemModel[]>(this.urlTramite.listas, this.tipoListaModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  getDetalleConsulta(tipoDetalleParam: string, idsTablaSedesParam : string[]){
    this.getDetalle(tipoDetalleParam).subscribe(
      // Success response
      response => {
        this.detalleConsulta = response;
        //console.log('Prestadores 2...');
        
        //se inicializa, segun sea el caso
        if(tipoDetalleParam==this.tipoDetalle.prestadores)
          this.inicializarTablaDetallePrestadores();
        if(tipoDetalleParam==this.tipoDetalle.sedes)
          this.inicializarTablaDetalleSedes();
        if(tipoDetalleParam==this.tipoDetalle.servicios)
          this.inicializarTablaDetalleServicios();
        if(tipoDetalleParam==this.tipoDetalle.capacidad)
          this.inicializarTablaDetalleCapacidad();
        if(tipoDetalleParam==this.tipoDetalle.seguridad)
          //this.inicializarTablaDetalleSeguridad();
          this.inicializarTablaDetalleServicios();
        if(tipoDetalleParam==this.tipoDetalle.sanciones)
          //this.inicializarTablaDetalleSanciones();
          this.inicializarTablaDetalleServicios();

        //console.log('Prestadores 3...');
        this.setTablaDetalleDatos(idsTablaSedesParam);
        //console.log('Prestadores 4...');
        //Se activan las banderas respectivas para que se muestre el detalle
        this.asignarMostrarDetalle(true);
        //console.log('Prestadores 5...');
        this.asignarMostrarDetalleSinResultados(false);

        if(this.detalleConsulta==null || this.detalleConsulta.length==0){
          this.cantidadRegistrosOtro=this.detalleConsulta.length;
          this.asignarMostrarDetalle(false);
          this.asignarMostrarDetalleSinResultados(true);
        }

      },
      // Failure response
      error => {
        console.error(error);
      },
    );



    if(this.detalleConsulta==null)
      this.detalleConsulta = [];

  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

  getDetalleConsultaExcel(tipoDetalleParam: string){
    console.log('llega getDetalleConsultaExcel=...'+tipoDetalleParam);
    this.getDetalleExcel(tipoDetalleParam).subscribe(
      (data) => {
        window.scroll(0, 0);
        const newBlob = new Blob([data], {type: 'application/vnd.ms-excel'});
        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob && this.isIE()) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        // Otros navegadores
        const downloadURL = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Consulta de prestadores de salud '+tipoDetalleParam + '.xls';
        link.click();
        return;
      },
      (error) => {
          return;
      }
    );
    console.log('Termina getDetalleConsultaExcel=...'+this.detalleConsulta.length);
  }



  // Cargar detalle
  public getDetalle(tipoDetalle: string) {
    this.filtro.historia = tipoDetalle;
    return this.http.post<MinsaludDetalleModel[]>(this.urlTramite.detalle, this.filtro, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Generar certificado
  public getDetalleExcel(tipoDetalle: string) {
    return this.http.post(this.urlTramite.detalleExcel, this.filtro, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  public inicializarTablaDetallePrestadores() {

    this.tDetail = {
      Header: [
        {  content: 'Id',filter: false,typeFilter: '', hidden: true},
        { content: 'Departamento',filter: false,typeFilter: ''},
        { content: 'Municipio',filter: false,typeFilter: ''},
        { content: 'Código prestador',filter: false,typeFilter: ''},
        { content: 'Nombre prestador',filter: false,typeFilter: ''},
        { content: 'Dirección',filter: false,typeFilter: ''},
        { content: 'Teléfono',filter: false,typeFilter: ''} 
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }

  public inicializarTablaDetalleSedes() {
    this.tDetail = {
      Header: [
        {  content: 'Id',filter: false,typeFilter: '', hidden: true},
        {  content: 'Departamento',filter: false,typeFilter: ''},
        {  content: 'Municipio',filter: false,typeFilter: ''},
        {  content: 'Código prestador',filter: false,typeFilter: ''},
        {  content: 'Nombre prestador',filter: false,typeFilter: ''},
        {  content: 'Código sede prestador',filter: false,typeFilter: ''},
        {  content: 'Sede',filter: false,typeFilter: ''},
        {  content: 'Nombre sede prestador',filter: false,typeFilter: ''},
        {  content: 'Zona',filter: false,typeFilter: ''},
        {  content: 'Dirección',filter: false,typeFilter: ''},
        {  content: 'Teléfono',filter: false,typeFilter: ''}   
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }

  public inicializarTablaDetalleServicios() {
    this.tDetail = {
      Header: [
        {  content: 'Id',filter: false,typeFilter: '', hidden: true},
        {  content: 'Departamento',filter: false,typeFilter: ''},
        {  content: 'Municipio',filter: false,typeFilter: ''},
        {  content: 'Código sede',filter: false,typeFilter: ''},
        {  content: 'Sede',filter: false,typeFilter: ''},
        {  content: 'Nombre Sede Prestador',filter: false,typeFilter: ''},
        {  content: 'Servicio',filter: false,typeFilter: ''},   
        {  content: 'Distintivo',filter: false,typeFilter: ''}   
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }

  public inicializarTablaDetalleCapacidad() {
    this.tDetail = {
      Header: [
        {  content: 'Id',filter: false,typeFilter: '', hidden: true},
        {  content: 'Departamento',filter: false,typeFilter: ''},
        {  content: 'Municipio',filter: false,typeFilter: ''},
        {  content: 'Código sede prestador',filter: false,typeFilter: ''},
        {  content: 'Sede',filter: false,typeFilter: ''},
        {  content: 'Nombre sede prestador',filter: false,typeFilter: ''},
        {  content: 'Grupo',filter: false,typeFilter: ''},
        {  content: 'Cantidad',filter: false,typeFilter: ''},   
        {  content: 'No. de placa',filter: false,typeFilter: ''},  
        {  content: 'Modalidad',filter: false,typeFilter: ''},  
        {  content: 'Modelo',filter: false,typeFilter: ''},  
        {  content: 'Tarjeta propiedad',filter: false,typeFilter: ''} 
         
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }

  /*
  Función que llena la tabla detalle con las columnas especificadas en el array que pasa por parametro
  param: idsTablaSedesParam = Array definido en esta clase this.idsTablaSedes
  */
  public setTablaDetalleDatos(idsTablaSedesParam : string[]) {

      //Se recorre la lista de objetos
      for (let indexDatos = 0; indexDatos < this.detalleConsulta.length; indexDatos++) {
        const listElements = [];
        const data =  Object.keys(this.detalleConsulta[indexDatos]);

        //Se recorre el array de campos para asignarlos en el orden que se requiere
        for (let indexIds = 0; indexIds < idsTablaSedesParam.length; indexIds++) {
          // Se recorre la fila, para obtener el orden especifico que se requiere
          for (let j = 0; j < data.length; j++) {
            const element = this.detalleConsulta[indexDatos][data[j]];
            const el: TableCellModel = {
              content: element
            };
            if (data[j] === idsTablaSedesParam[indexIds]) {
              
            //Solo se abre el popup al nombre del prestador
            if (data[j] === 'nombre_prestador' || data[j] === 'nombre_sede'){
              el.type = 'link-event';
              el.class = 'btn btn-low wspace-normal';
              el.event = this.getDetail;
            }
              
              listElements.push(el);
            }
          }
        }

        //Se adiciona la fila, con el orden de campos especificado
        this.tDetail.Body.push(listElements);

        this.cantidadRegistros=listElements.length;

      }

  }

  // Función general para el evento de abrir modal sobre la tabla detalle
  private getDetail = (e, item, index) => {
    this.registroSeleccionado = this.detalleConsulta[item[0].content]; // TODO: Validar la carga de data en la instancia
    this.minsaludModal.getDetail(item, this.opcionSeleccionada);
  }

  public inicializarFiltro() {
    this.filtro = this.inicializarFiltroJson("");
    this.listaMunicipioFiltrado=[];
    this.listaMunicipioFiltrado2=[];
  }    

  public inicializarFiltroJson(historiaParam:any) {
    const filtroTemp={    historia:"", numero_documento:"", naturaleza_juridica:"", departamento_prestador:"", municipio_prestador:"", codigo_prestador:"", nombre_prestador:"", clase_prestador:"", ese:"", nivel_atencion:"", caracter_territorial:"", departamento_sede:"", municipio_sede:"", codigo_sede:"", sede_principal:"", nombre_sede:"", zona:"",     grupo:"",     codigo_servicio:"",   intramural_ambulatorio:"",   intramural_hospitalario:"",   extramural_domiciliario:"",   extramural_otras:"",   extramural_unidad:"",   telemedicina_centro:"",   telemedicina_institucion:"",   complejidad_baja:"",   complejidad_media:"",   complejidad_alta:"", servicio_nombre:"", concepto:""};
    filtroTemp.historia=historiaParam;
    return filtroTemp;
  }    

  public inicializarRegistroSeleccionado() {
    if(this.registroSeleccionado==null)
      this.registroSeleccionado = {barrio:"", caracter_territorial:"", centro_poblado:"", clase_prestador:"", codigo_prestador:"", codigo_sede:"", codigo_sede_prestador:"", correo_electronico:"", departamento_prestador:"", departamento_sede:"", direccion:"", ese:"", fax:"", fecha_apertura:"", gerente:"", municipio:"", municipio_prestador:"", municipio_sede:"", naturaleza_juridica:"", nivel_atencion:"", nombre_prestador:"", nombre_sede:"", nombre_sede_prestador:"", numero_documento:"", sede:"", sede_principal:"", telefono:"", tipo_documento:"", zona:"", serv_nombre:"", dv:"", indigena:"", grupo_capacidad:"", coca_codigo:"", coca_nombre:"", cantidad:"", numero_placa:"", modalidad:"", modelo:"", numero_tarjeta:"", codigo_habilitacion:"", numero_distintivo:"", razon_social:"", fecha_radicacion:"", fecha_vencimiento:"", id:"", ambulatorio:"", hospitalario:"", unidad_movil:"", domiciliario:"", otras_extramural:"", centro_referencia:"", institucion_remisora:"", complejidad_baja:"", complejidad_media:"", complejidad_alta:"", complejidad:"", concepto:""};
  }   
  
  seleccionarHistoria(opcionSeleccionadaParam: any) {
    this.opcionSeleccionada=opcionSeleccionadaParam;
    //En caso de que venga la opcion 'Medidas se seguridad, que es el nombre de la pestaña, se pone solo Medidas'
    if(opcionSeleccionadaParam==this.opciones[4]){
      this.router.navigate(['/minsalud-consulta/Medidas']);
    }else
      this.router.navigate(['/minsalud-consulta/'+this.opcionSeleccionada]);
  }

  //Carga la lista de municipios principal de departamentos seleccionados
  cargarMunicipios(idDepartamento: string){
    this.listaMunicipioFiltrado=[];
    if(idDepartamento!=null && idDepartamento!=""){
      for(let index = 0; index < this.listaMunicipio.length; index++) {
        if(this.listaMunicipio[index].value=="" || this.listaMunicipio[index].value.substring(0, 2)==idDepartamento){
          this.listaMunicipioFiltrado.push(this.listaMunicipio[index]);
        }
      }
    }
  }

  //Se crea un segundo evento, cuando el mismo formulario tiene dos listas de municipios diferentes
  cargarMunicipios2(idDepartamento: string){
    this.listaMunicipioFiltrado2=[];
    if(idDepartamento!=null && idDepartamento!=""){
      for(let index = 0; index < this.listaMunicipio.length; index++) {
        if(this.listaMunicipio[index].value=="" || this.listaMunicipio[index].value.substring(0, 2)==idDepartamento){
          this.listaMunicipioFiltrado2.push(this.listaMunicipio[index]);
        }
      }
    }
  }
  backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
