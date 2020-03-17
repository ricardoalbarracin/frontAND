import { Component, OnInit } from '@angular/core';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';
import { DETAILS, CITAS } from '@shared/forms/services/table-details';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { Router } from '@angular/router';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { dialogModal } from '@shared/dialog-modal/models/dialogModal';

@Component({
  selector: 'app-historico-citas',
  templateUrl: './historico-citas.component.html',
  styleUrls: ['./historico-citas.component.scss']
})
export class HistoricoCitasComponent implements OnInit {

  public tDetail: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: []
  };

  public isInvalid: boolean = false;
  public currentMessage: string = "";
  public username: string;
  public document: string;
  public citasCount: number = 0;
  public historicoList: any[] = [];
  private itemSelected: any;

  constructor(
    private tramiteService: MinjusticiaUtilsService, 
    private router: Router,
    private authService: AgendamientoAuthenticationService,
    private confirmModal: ConfirmModalService) { 
    this.setTableDetailcData();
  }
 
  ngOnInit() {
    this.validateUserlogged();
    this.tramiteService.resetQueryParams();
    this.loadPersonalInformation();
    this.tramiteService.setTramiteStep("4");
  }

  ngAfterViewInit(){
    const newDetail = document.getElementById('table-detail-external');
    const detail = document.getElementById('detail-external');
    newDetail.appendChild(detail);

    const newTitle = document.getElementById('table-title-external');
    const title = document.getElementById('title-external');
    newTitle.appendChild(title);
  }

  //Verifica si el usuario tiene una sesión activa
  validateUserlogged(): string {
    const token = this.authService.getValueToken();
    if (token === ""){
      this.resetValues();
      return "";
    }

    return token;
  }

  // Función set para la organización de datos de tabla tipo detail
   private setTableDetailcData() {
    this.buildHeader();
    this.buildConfigBody();
    this.getCitasAgendadas();    
  }

  // Estructura de configuración header por columna
  private buildHeader(): void {     
     let header: TableHeaderModel[] = [
      { content: 'Fecha de cita', columnName: 'fecha', order: 1},
      { content: 'Hora de cita', columnName: 'hora', order: 2},
      { content: 'Consultorio', columnName: 'consultorio', order: 3},
      { content: 'Tema', columnName: 'tema', order: 4},
      { content: 'Cancelar', columnName: 'cancel', order: 5}
    ];

    let headerSort: TableHeaderModel[];
    headerSort =  header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    this.tDetail.Header = headerSort;

    return;
  }

  // Estructura de configuración del contenido por columna
  private buildConfigBody(): void {    
    const configBody: TableConfigModel[] = [
      {columnName: 'fecha', columnType: 'string'},
      {columnName: 'hora', columnType: 'string'},
      {columnName: 'consultorio', columnType: 'string'},
      {columnName: 'tema', columnType: 'string'},
      {columnName: 'cancel', columnType: 'string'}
    ];    
    this.tDetail.ConfigBody = configBody;
    return;
  }

  //Valida si desea cancelar la cita
  cancelarCita = (event, elementArray, index) => {
    this.itemSelected = this.getItemSelected(elementArray[3].content, 
        elementArray[2].content, 
        elementArray[0].content, 
        elementArray[1].content);

    let options: dialogModal[] = [
      {
        name: "REGRESAR",
        value: false,
        styleClass: "btn-middle",
        event: () => {}
      },{
        name: "CANCELAR",
        value: true,
        styleClass: "btn-high",
        event: this.sendData
      }
    ]

    this.confirmModal.openDialogCustom(
      "Cancelar cita",
      "Debes confirmar que vas a cancelar la cita",
      options,
      "error",
      false,
      "lg"
    );
  }

  //Llama el servicio de cancelar cita y gestiona la respuesta
  sendData = () =>  {
    this.isInvalid = false;
    const token = this.validateUserlogged();

    if (token != "" && this.itemSelected != undefined){
      //TODO: Asignarle el valor correspondiente al modelo
      this.tramiteService.cancelarCita(this.itemSelected, token).subscribe(
        (data) => {
          if (data["success"]){
            this.showNotificationSuccess();
          }else {
            this.isInvalid = true;
            this.currentMessage = data["message"];
          }
        },
        (error) => {
          this.isInvalid = true;
            this.currentMessage = "No fue posible cancelar la cita";
        }
      );
    }
  }

  getItemSelected(tema, consultorio, fecha, hora): any {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (this.historicoList != undefined && this.historicoList.length > 0) {
      const itemSelected = this.historicoList.find(item => {
        const fechaItem =  new Date(item.fecha).toLocaleDateString('es-ES', options)
        return item.tema == tema && item.consultorio == consultorio && fechaItem == fecha && item.hora == hora
      });

      return itemSelected;      
    }

    return undefined;
  }

  //Consulta el historico de citas
  getCitasAgendadas() : void {
    this.isInvalid = false;
    const token = this.validateUserlogged();

    if (token != ""){
      const username = this.authService.getUsername();
      
      this.tramiteService.getListCitasAgendadas(username).subscribe(
        (data) => {
          if (data["success"]){
            this.historicoList = data["result"];
            this.refactorCitas(data["result"]);
          }else {
            this.isInvalid = true;
            this.currentMessage = data["message"];
          }
        },
        (error) => {
          this.isInvalid = true;
            this.currentMessage = "No fue posible obtener el historico de citas";
        }
      );
    }
  }

  //Realiza la solicitud para obtener los datos personales
  loadPersonalInformation(): void {
    const username = this.authService.getUsername();

    this.authService.getUserInformation(username).subscribe(
      (data) => {
        if (data["success"]){
          this.buildPersonalInformation(data["result"]);
        }else {
          this.currentMessage = data["message"];
        }
      }
    );
  }

  //Carga la información de la persona en la vista
  buildPersonalInformation(data): void {
    this.username =  data.usuarioPrimerNombre + " " 
      + this.validateName(data.usuarioSegundoNombre)
      + this.validateName(data.usuarioPrimerApellido)
      + this.validateName(data.usuarioSegundoApellido);

    this.document = data.usuarioIdentificacion;
  }

  //Valida cadena de texto de nombre si existe
  validateName(name): string {
    if (name == undefined || name == null || name == ""){
      return "";
    }

    return name + " ";
  }

  //Reestructura la información de historico para adaptarlo al cuerpo de la tabla
  private refactorCitas(array: any[]): void {
    let bodyElements: any[] = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (array != undefined && array.length > 0){
      this.citasCount = array.length;
      for (const data of array) {
        const listElements = [];

        // Recorre configuración de header
        for (const config of this.tDetail.Header) {
          let cellData = data[config.columnName];

          if (config.columnName == "fecha") {
            cellData = new Date(cellData).toLocaleDateString('es-ES', options);
          }

          const el: TableCellModel = { content: cellData };

          // Caso columna 'name'
          if (config.columnName === 'cancel') {
            el.type = 'button';
            el.class = 'govco-icon govco-icon-x-n btn btn-size-11 btn-transparent color-dodger-blue';
            el.event  = this.cancelarCita;
          }

          // Agrega columna a fila listElements
          listElements.push(el);
        }
        // Agrega fila a body
        bodyElements.push(listElements);
      }
    }
    this.tDetail.Body = bodyElements;    
  }

  //Muestra notificación de éxito para cancelar una cita
  private showNotificationSuccess() : void {
    this.confirmModal.openNotificationDialog(
      "Cancelación exitosa", 
      "la cita seleccionada se canceló correctamente", 
      "success", 
      this.reloadList
    );
  }

  //Reinicia los valores de la tabla y hace el llamado al método de consulta de registros
  private reloadList = () => {
    this.tDetail.Body = [];
    this.historicoList = [];
    this.itemSelected = undefined;
    this.getCitasAgendadas();
  }

  //Elimina los valores temporales y devuelve al inicio del trámite
  private resetValues(): void {
    this.authService.logOut();
    this.tramiteService.resetQueryParams();
    this.router.navigate([this.tramiteService.getTramiteUrl()]);
  }

}
