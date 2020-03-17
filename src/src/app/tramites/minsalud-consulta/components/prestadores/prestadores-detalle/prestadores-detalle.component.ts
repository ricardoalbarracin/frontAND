import { Component, OnInit } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GovcoTableModel, TableCellModel } from '@shared/forms/models/table.model';
import { PrestadoresDetalleModalComponent } from '../prestadores-detalle-modal/prestadores-detalle-modal.component';
import { MinsaludDetalleModel } from '../../../models/MinsaludDetalleModel';
import { MinsaludFiltroModel } from '../../../models/MinsaludFiltroModel';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-minsalud-consulta-prestadores-detalle',
  templateUrl: './prestadores-detalle.component.html',
  styleUrls: ['./prestadores-detalle.component.scss']
})
export class PrestadoresDetalleComponent implements OnInit {


  
  public tDetail: GovcoTableModel;

  detalleConsulta: MinsaludDetalleModel[];

  modal: any;

  idsTabla: string[] = ['nombre_prestador','codigo_prestador','departamento_prestador','municipio_prestador','direccion','telefono'];

  constructor(private location: Location, private http: HttpClient, public concultaService: MinsaludConsultaUtilService, public modalService: NgbModal) {
    this.concultaService.asignarDescargaCompleta(false);
  }

  getTabla(){
    return this.concultaService.tDetail;
  }
  
  open(content) {
    this.modalService.open(content, { size: "lg",  windowClass:"modal-detail-govco", scrollable: true });
  }

  closeModalConDescarga() {
    this.descargarResultados();
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.getDetalleConsulta();
    this.inicializarTablaDetallePrestadores();
  }

  descargarResultados(){
    this.concultaService.asignarDescargaCompleta(true);
  }

  public inicializarTablaDetallePrestadores() {
    this.tDetail = {
      Header: [
        {  content: 'Nombre del prestador',filter: false,typeFilter: ''},
        {  content: 'Código prestador',filter: false,typeFilter: ''},
        {  content: 'Departamento',filter: false,typeFilter: ''},
        {  content: 'Municipio',filter: false,typeFilter: ''},
        {  content: 'Dirección',filter: false,typeFilter: ''},
        {  content: 'Teléfono',filter: false,typeFilter: ''}   
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }

  getDetalleConsulta(){
    //console.log('Prestador detalle Ingresa a getDetalleConsulta...');
    this.getDetalle().subscribe(
      // Success response
      response => {
        this.detalleConsulta = response;
        if(this.detalleConsulta != null){
          console.log('Trae bien...this.detalleConsulta.length='+this.detalleConsulta.length);
        }


        console.log('Activa bandera...');

      },
      // Failure response
      error => {
        //console.log('Trae mal...');
        console.error(error);
      },
    );

    if(this.detalleConsulta==null)
      this.detalleConsulta = [];
    
    //console.log('Prestador detalle Pasa a getDetalleConsulta...this.detalleConsulta.length='+this.detalleConsulta.length);

    //location.reload();



  }

  // Cargar detalle
  public getDetalle() {
    this.concultaService.filtro.historia = this.concultaService.tipoDetalle.prestadores;
    return this.http.post<MinsaludDetalleModel[]>(this.concultaService.urlTramite.detalle, this.concultaService.filtro, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  /*
  Función que llena la tabla detalle con las columnas especificadas en el array que pasa por parametro
  param: idsTablaSedesParam = Array definido en esta clase this.idsTablaSedes
  */
 public setTablaDetalleDatos() {

  //Se recorre la lista de objetos
  for (let indexDatos = 0; indexDatos < this.detalleConsulta.length; indexDatos++) {
    const listElements = [];
    const data =  Object.keys(this.detalleConsulta[indexDatos]);

    //Se recorre el array de campos para asignarlos en el orden que se requiere
    for (let indexIds = 0; indexIds < this.idsTabla.length; indexIds++) {
      // Se recorre la fila, para obtener el orden especifico que se requiere
      for (let j = 0; j < data.length; j++) {
        const element = this.detalleConsulta[indexDatos][data[j]];
        const el: TableCellModel = {
          content: element
        };
        if (data[j] === this.idsTabla[indexIds]) {
          
          //Solo se abre el popup al nombre del prestador
          if (data[j] === 'nombre_prestador'){
            el.type = 'link-event';
            el.class = 'btn btn-low';
            el.event = this.abrirPopup;
          }
          
          
          listElements.push(el);
        }
      }
    }

    //Se adiciona la fila, con el orden de campos especificado
    this.tDetail.Body.push(listElements);

  }

    console.log('Despues de ...');
    console.log(this.tDetail);

}

  // Función de ejemplo para la apertura de modal
  // NOTA: Debe ser tipo anonima para que el contexto de la clase se mantenga
  private abrirPopup = (e, item, index) => {
    const modal = this.modalService.open(PrestadoresDetalleModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modal.componentInstance.data = item;
  }

public abrirPopup1(e, item, index){
  console.log('service EVENTO DE BOTÓN');

  //console.log(e);
  //console.log('service ITEM DE LA FILA');
  //console.log(item);
  //console.log('service INDEX DE LA FILA');
  //console.log(index);

  this.modal = this.modalService.open(PrestadoresDetalleModalComponent, { size: 'lg', 
    backdrop: "static",
    keyboard: false
  });

}


}
