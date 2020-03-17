import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FichaTramiteService } from '../../services/ficha-tramite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntosAtencionComponent } from '../puntos-atencion-modal/puntos-atencion-modal.component';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ficha-especifica',
  templateUrl: './fichaespecifica.component.html',
  styleUrls: ['./fichaespecifica.component.scss'],
  providers: [NgbAccordionConfig]
})
export class FichaEspecificaComponent implements OnInit {
  @Input() informacionFicha: any;

  @Output() propagar = new EventEmitter<object>();

  infoBasicaTramite: any;
  audiencias: any[];

  ordenAudiencias: any[];
  dataAudiencias: any[];
  dataNormatividad = [];
  numeroId = '';
  activeIdsAcordeon = [];
  dataExcepciones = [];
  puntosAtencion = [];
  embebidos;

  constructor(
    private fichaTramiteService: FichaTramiteService,
    private modalService: NgbModal,
    ) {}

  ngOnInit() {
    this.loadDataInfoFicha(this.informacionFicha);
  }

  private async loadDataInfoFicha(dataTramite: any) {

    this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(dataTramite.id).subscribe(dataFicha => {
      this.infoBasicaTramite = dataFicha;
      this.fichaTramiteService.GetTiposAudienciaById(dataTramite.id).subscribe(n => {
        this.audiencias = n;
        if ( this.audiencias.length > 0 ) {
          this.loadMomentosAutiencia(dataTramite.id, this.audiencias[0].detalle);
        }
      });
    });

  }



  cargarDetalleMomento(data) {

    this.fichaTramiteService.GetDataFichaByIdAudiencia(this.informacionFicha.id, data.audiencia, data.momento)

      .subscribe( (dataAccion: any) => {

        dataAccion.forEach( element => {
          this.audiencias.forEach( (item) => {
            if (item.detalle ===  data.audiencia) {
                item.momentos.forEach( (i) => {
                  if (i.Orden === data.momento) {
                    i.acciones = this.procesarDataAcciones(dataAccion);
                  }
                });
            }
          });
        });
        console.log(this.audiencias);
      });

  }

  private procesarDataAcciones(data: any[]) {
    const temporal: any[] = [];
    const dataretorno: any[] = [];

    data.forEach( i => {
      const busqueda = temporal.find( n => n.AccionCondicionId === i.AccionCondicionId );
      if (typeof(busqueda) === 'undefined') {
        temporal.push(i);
      }
    });

    temporal.forEach( n => {
      if (!dataretorno[n.TipoAccionCondicion]) {
        dataretorno[n.TipoAccionCondicion] = [];
      }
      dataretorno[n.TipoAccionCondicion].push(n);
    });

    return dataretorno;
  }

  cargarMomentosAudiencia(data) {
    this.loadMomentosAutiencia( this.informacionFicha.id, data.detalle);
  }

  private loadMomentosAutiencia(idTramite: number, audiencias: string ) {

    this.fichaTramiteService.GetMomentosByIdAudiencia(idTramite, audiencias ).subscribe( n => {
      this.audiencias.forEach( (item) => {
        if (item.detalle === audiencias) {
          item.momentos = n;
        }
      });



    });
   }



   ngOnChanges1() {
    // if (this.tipoFicha === 601 &&  this.tipoFicha != undefined){
    //   this.route.paramMap.subscribe(async params => {
    //     this.numeroId = this.route.snapshot.params.id.substr(1,20)

    //     this.dataBase = await  this.fichaTramiteService.GetInfoBasicaEspecifica(this.numeroId).toPromise();
    //     let minuscula =  this.dataBase.Entidad.toLowerCase();

    //     this.entidad = minuscula.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1){
    //       return $1.toUpperCase();
    //    });
    //     console.log(this.dataBase , "VERIFICAR TITULO Y LA URL DE LA ENTIDAD NO SE HA ENCONTRADO");

    //     this.audiencias = await  this.fichaTramiteService.GetTiposAudienciaById(this.numeroId).toPromise();
    //     this.TitulosTipoAudiencia(this.numeroId,this.audiencias[0].tipoaudiencia);
    //     console.log("carga inicial audiencia",this.audiencias);

    //     this.dataUrl = await  this.fichaTramiteService.GetTipoTramiteFichaEspecificaById(this.numeroId).toPromise();
    //     if(this.dataUrl.Tipotramite == "Realizar trámite en línea" || this.dataUrl.Tipotramite =="SemiPresencial"){
    //       await  this.fichaTramiteService.GetEmbebidosByIdTramite(this.numeroId)
    //       .toPromise()
    //       .then(res => this.embebidos = res)
    //       .catch(error => this.embebidos = "Enlinea");
    //     }
    //     else{
    //       this.embebidos = "Enlinea";
    //     }

    //     await  this.fichaTramiteService.GetNormatividadById(this.numeroId)
    //     .toPromise()
    //     .then(res => this.dataNormatividad = res)
    //     .catch(error => this.dataNormatividad = []);

    //     await  this.fichaTramiteService.GetPuntosAtencionById(this.numeroId)
    //     .toPromise()
    //     .then(res => this.puntosAtencion = res)
    //     .catch(error => this.puntosAtencion  = []);
    //   });
    // }
  }

  ngAfterViewChecked() {
    this.setNumeroTramite(this.numeroId);
  }
  setNumeroTramite(numero: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    if(s.length > 0){
      s[0].setAttribute('itemid', 'T' + numero);
    }
  }

  tipoAudienciafuncion(audiencia): void {
    this.ordenAudiencias = [];
    this.TitulosTipoAudiencia(this.numeroId, audiencia);
  }
  async TitulosTipoAudiencia(numeroId, tipoAudiencia) {
    this.ordenAudiencias = await  this.fichaTramiteService.GetMomentosByIdAudiencia(numeroId,tipoAudiencia).toPromise();
    console.log("carga inicial orden audiencia", this.ordenAudiencias);

  }
  dataMomentoAudiencia(tipoAudiencia, momento): void {
    //this.activeIdsAcordeon.push(idacordeon);
    this.ordenAudiencias.forEach(item => {
     // let informacion = JSON.parse(item.Informacion);
      if(item.Informacion == "[]" && momento == item.Orden){
         this.fichaTramiteService.GetDataFichaByIdAudiencia(this.numeroId, tipoAudiencia, momento).subscribe(res =>{
          this.dataAudiencias = res;
          this.procesadorPrincipalData(this.dataAudiencias, momento);
        });
      }
    });
  }
   async procesadorPrincipalData(data, momento) {
    let CondicionNueva = '';
    let OrdenAccion = 0;
    let subTitulo: string;
    let descripcion = [];
    let dataFormularios = {};
    let nuevaData = [];
    let nuevaDataExcepciones = [];
    let dataExepcionesProcesada = [];
    let excepciones =  [];
    let solicitud = true;
    let ordenParcial;
    this.dataExcepciones =  [];

    for ( const element of data) {

      descripcion = [];
      subTitulo = '';
      solicitud = true;
      ordenParcial = 0;

      if (element.OrdenAccion > OrdenAccion) {
        CondicionNueva = element.CondicionNueva;
        for (const item of data) {
            if (item.CondicionNueva == CondicionNueva){
              CondicionNueva = item.CondicionNueva;
              if (item.OrdenAccion >= element.OrdenAccion){
                OrdenAccion = item.OrdenAccion;

                if (item.TipoAccionCondicion === 'VERIFICACION_INST' &&  item.OrdenAccion > ordenParcial ) {
                  ordenParcial = item.OrdenAccion;
                  const tipoDato = this.tipoCondicionAudiencia(item.TipoAccionCondicion);
                  if (item.Excepcion != null) {
                    const condicionExcepcion = {
                      NombreExcepcion : item.Excepcion,
                      Tipo : tipoDato,
                      ContenidoExepcion : item.VerificacionInstDescripcion
                    };
                    excepciones.push(condicionExcepcion);
                  } else {
                    descripcion.push(item.VerificacionInstDescripcion)}
                  subTitulo = tipoDato;

                }
                else if (item.TipoAccionCondicion === 'DOCUMENTO' &&  item.OrdenAccion > ordenParcial) {

                  ordenParcial = item.OrdenAccion;
                  const tipoDato = this.tipoCondicionAudiencia(item.TipoAccionCondicion);
                  if(item.Excepcion != null){
                    const documentoExcepcion = {
                      NombreExcepcion : item.Excepcion,
                      Tipo : tipoDato,
                      ContenidoExepcion : this.dataDocumentos(item)
                    };
                    excepciones.push(documentoExcepcion);
                  }
                  else {
                    descripcion.push(this.dataDocumentos(item))}
                  subTitulo = tipoDato;

                }
                else if (item.TipoAccionCondicion === 'FORMULARIO' && item.OrdenAccion > ordenParcial) {
                  ordenParcial = item.OrdenAccion;
                  const tipoDato = this.tipoCondicionAudiencia(item.TipoAccionCondicion);
                  if (item.Excepcion != null) {
                    const formularioExcepcion = {
                      NombreExcepcion : item.Excepcion,
                      Tipo : tipoDato,
                      ContenidoExepcion : this.dataFormularios(item)
                    };
                    excepciones.push(formularioExcepcion);
                  } else {descripcion.push(this.dataFormularios(item))}
                  subTitulo = tipoDato;

                }
              }

              if (item.TipoAccionCondicion === 'SOLICITUD' && solicitud && element.OrdenAccion === OrdenAccion) {
                  let dataCanales;
                  const tipoDato = this.tipoCondicionAudiencia(item.TipoAccionCondicion);
                  await  this.dataCanalAtencion(item).then(
                    (val) => dataCanales = val )
                  if (item.Excepcion != null) {
                    const canalExcepcion = {
                      NombreExcepcion : item.Excepcion,
                      Tipo : tipoDato,
                      ContenidoExepcion : dataCanales
                    };
                    excepciones.push(canalExcepcion);
                  }else{descripcion.push(dataCanales)}
                  subTitulo = tipoDato;
                  solicitud = false;

                }
                else if(item.TipoAccionCondicion == "PAGO" &&  solicitud && element.OrdenAccion == OrdenAccion){
                  let dataPagos;
                  let tipoDato = this.tipoCondicionAudiencia(item.TipoAccionCondicion)
                  await  this.dataPagos(item).then(
                    (val) => dataPagos = val)
                  if (item.Excepcion) {
                    const pagoExcepcion = {
                      NombreExcepcion : item.Excepcion,
                      Tipo : tipoDato,
                      ContenidoExepcion : dataPagos
                    };
                    excepciones.push(pagoExcepcion);
                  } else {
                    descripcion.push(dataPagos);
                  }
                  subTitulo = tipoDato;
                  solicitud = false;

                }
            }else if (item.OrdenAccion > OrdenAccion) {
              break;
            }
          }
        }

      if(descripcion.length != 0){
        nuevaData.push({
          'subtitulo': subTitulo,
          'descripcion': descripcion,
        });
        descripcion = [];
      }
      if(excepciones.length != 0){
        nuevaDataExcepciones.push(excepciones);
        excepciones = [];
      }
    }
    if(nuevaData.length > 0 || nuevaDataExcepciones.length >0){
      this.unionDataNuevaYExcepciones(nuevaData,nuevaDataExcepciones,momento);
    }

  }
  unionDataNuevaYExcepciones(nuevaData,nuevaDataExcepciones,momento):void{
    let dataExepciones = [];
    if(nuevaDataExcepciones.length > 0){
     dataExepciones = this.procesadorDataExepciones(nuevaDataExcepciones);
    }
    this.ordenAudiencias.forEach(item => {
      if(item.Orden == momento){
        let dataSerializada = JSON.stringify(nuevaData);
        item.Informacion = dataSerializada;
        if(dataExepciones.length > 0){
          let excepcionesSerializada = JSON.stringify(dataExepciones);
          item.Excepcion = excepcionesSerializada
        }
      }
    });
  }
  procesadorDataExepciones(data): Array<object>{
    let NombreExcepcion;
    let NombresAcordeon = [];
    data.forEach(item => {
      item.forEach(itemInterno => {
        NombreExcepcion = itemInterno.NombreExcepcion;
        if(NombresAcordeon.length > 0){
          let result = NombresAcordeon.find(nombre => nombre === NombreExcepcion);
          if(result == null){
            NombresAcordeon.push(NombreExcepcion);
          }
        }
        else{
          NombresAcordeon.push(NombreExcepcion);
        }
      });
    });
    let dataOrganizadaExcepcion = this.ordenarDataSegunNombres(NombresAcordeon,data);
    return dataOrganizadaExcepcion;
  }

  ordenarDataSegunNombres(nombres,data):Array<object>{
    let dataOrganizadaExcepcion = [];
    let contenido = [];

    nombres.forEach(nombre =>{
      data.forEach(dataPasos => {
        dataPasos.map(function(itemData) {
          if(itemData.NombreExcepcion == nombre){
            if(dataOrganizadaExcepcion.length > 0){
            let result =  dataOrganizadaExcepcion.map(function (itemNombre){
              if(itemNombre.TituloAcordeon == itemData.NombreExcepcion){
                itemNombre['Contenido'].push({
                subtitulo: itemData.Tipo,
                descripcion: itemData.ContenidoExepcion
                });
                return true;
              }
            })
            if(result[result.length-1] == undefined){
              let dataAcordeon = {
                subtitulo: itemData.Tipo,
                descripcion: itemData.ContenidoExepcion,
              }
              contenido.push(dataAcordeon);
              dataOrganizadaExcepcion.push({
                TituloAcordeon : itemData.NombreExcepcion,
                Contenido :  contenido
              });
              contenido = [];
            }
            }else{
                let dataAcordeon = {
                  subtitulo: itemData.Tipo,
                  descripcion: itemData.ContenidoExepcion,
                }
                contenido.push(dataAcordeon);
                dataOrganizadaExcepcion.push({
                  TituloAcordeon : itemData.NombreExcepcion,
                  Contenido :  contenido
                });
                contenido = [];
            }
          }
        });
    });
    })
    return dataOrganizadaExcepcion;
  };

  dataPagos(item){
    let descripcionPago = [];
    let ordenPago = 0;
    let entidadRecaudadora = [];
    let promise = new Promise(async (resolve,rejected) => {
    let pagos = await  this.fichaTramiteService.GetPagosByMomentoIdAudiencia(this.numeroId, item.TipoAudiencia,item.OrdenMomento).toPromise();

    pagos.forEach(itemPagos => {
      if(itemPagos.OrdenPago > 0 ){
        if(itemPagos.OrdenPago  > ordenPago){
          ordenPago = itemPagos.OrdenPago;
          const descripcion = {
            nombreDescripcion : itemPagos.DescripcionPago,
            moneda : itemPagos.Moneda,
            tipoValor : itemPagos.TipoValor,
            cantidadSmlv : itemPagos.CantidadSmlv,
            valor : itemPagos.Valor
          }
          descripcionPago.push(descripcion);
        }
        if(entidadRecaudadora.length > 0){
          let result = entidadRecaudadora.find(entidad => (entidad.nombreEntidad === itemPagos.NombreEntidad ||
                                               entidad.numeroCuenta === itemPagos.NumeroCuenta && itemPagos.NumeroCuenta != null));
          if(result == null){
            let banco = {
              nombreEntidad : itemPagos.NombreEntidad,
              tipoCuenta : itemPagos.TipoCuenta,
              numeroCuenta : itemPagos.NumeroCuenta,
              nombreCuenta: itemPagos.NombreCuenta,
              codigoRecaudo : itemPagos.CodigoRecaudo
            }
            entidadRecaudadora.push(banco);
          }

        }else{
          if(itemPagos.NumeroCuenta != null){
            let banco = {
              nombreEntidad : itemPagos.NombreEntidad,
              tipoCuenta : itemPagos.TipoCuenta,
              numeroCuenta : itemPagos.NumeroCuenta,
              nombreCuenta: itemPagos.NombreCuenta,
              codigoRecaudo : itemPagos.CodigoRecaudo
            }
            entidadRecaudadora.push(banco);
          }
        }
      }
    });
    let ObjetoPagos = {
      DescripcionMomento : item.DescripcionMomento,
      DescripcionPago : descripcionPago,
      EntidadRecaudadora : entidadRecaudadora
    }
    resolve(ObjetoPagos);
    });
    return promise;
  }
  dataDocumentos(item):object{
    let dataDocumentos = {
      nombre : item.DocumentoNombre,
      descripcion : item.DocumentoAnotacionAdicional,
      cantidadDoc : item.CantidadDoc,
      unidadCantidad : item.UnidadCantidad,
      observacionCantidad : item.ObservacionCantidad,
    }
    return dataDocumentos;
  }
  dataFormularios(item):object{
    let  dataFormularios = {
      nombre : item.FormularioNombre,
      descripcion : item.FormularioAnotacion,
      descarga : item.FormularioUrlDescarga,
      url : item.UrlResultadoWeb
    }
    return dataFormularios;
  }
    dataCanalAtencion(item){
    let dataCanales;
    let descripcion = [];
    let canalAtencion = {};

    let promise =  new Promise(async (resolve,rejected) => {
      let canal = await  this.fichaTramiteService.GetCanalesByMomentoIdAudiencia(this.numeroId, item.TipoAudiencia,item.OrdenMomento).toPromise();
      let puntosAtencion = this.puntosAtencion;
      canal.forEach(itemCanal => {
        canalAtencion = {
          canal : itemCanal
        };
        if(itemCanal.TipoCanal == "PRESENCIAL"){
          canalAtencion = {
            canal : itemCanal,
            puntosAtencion :  puntosAtencion
          };
        }
        descripcion.push(
          dataCanales = {
            descripcion : item.AtencionDescripcion,
            canal : canalAtencion,
          }
        );
        canalAtencion = {};
      });
    resolve(descripcion);
    });
    return promise;
  }
  tipoCondicionAudiencia(data):string{
    let tipoCondicion;

      switch (data) {
        case "VERIFICACION_INST":
          tipoCondicion ="Condiciones";
            break;
        case "PAGO":
          tipoCondicion ="Pago";
            break;
        case "SOLICITUD":
          tipoCondicion ="Canal de atención";
            break;
        case "DOCUMENTO":
          tipoCondicion ="Documento";
            break;
        case "FORMULARIO":
          tipoCondicion ="Formulario";
            break;
        case "EXCEPCION":
          tipoCondicion ="Excepción";
            break;
        default:
          tipoCondicion = data;
            break;
    }
    return tipoCondicion;
  }
  extractFromJson(obj){
    obj = JSON.parse(obj);
    return obj;
  }
  showModal(data) {
   const modal = this.modalService.open(PuntosAtencionComponent, { size: 'lg',
      backdrop: "static",
      keyboard: false
    });
    if(data.tipo == "puntos"){
    modal.componentInstance.puntosAtencion = data.data;
    }
    if(data.tipo == "normatividad"){
      modal.componentInstance.normatividad = data.data;
    }
  }
  redireccionar(){
    this.propagar.emit({ id : this.numeroId , tipo : 'Embebido', data : this.embebidos });
  }


}

