import { Component, OnInit, Input } from '@angular/core';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DETAILS } from '@shared/forms/services/table-details';
import { SIMPLE } from '@shared/forms/services/table-simple';
import { FILTER } from '@shared/forms/services/table-filters';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() flagTrue: boolean;
  public modalService: NgbModal;

  public tBasic: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: [],
  };

  public tSimple: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: []
  };

  public tDetail: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: []
  };

  public tFilter: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: [],
    ConfigFilter: []
  };

  constructor(modalService: NgbModal, private modalAlertService: ConfirmModalService) { this.modalService = modalService; }

  ngOnInit() {
    this.flagTrue = true;
    this.setTableBasicData();
    this.setTableSimplecData();
    this.setTableDetailcData();
    this.setTableFilterData();
  }

  // Función set para la organización de datos de tabla tipo básic
  private setTableBasicData() {

    // Estructura de configuración header por columna
    const header: TableHeaderModel[] = [
      { content: 'Id', columnName: 'id', hidden: true},
      { content: 'Medio', columnName: 'med'},
      { content: 'Detalle', columnName: 'det'}
    ];

    // Datos ejemplo body
    const body: TableCellModel[] = [
      { content: 'id', type: 'number'},
      { content: 'WEB',  type: 'text', link: 'www.google.com'},
      { content: 'Registro de datos en linea', type: 'link', link: 'www.google.com'}
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      {columnName: 'id', columnType: 'number'},
      {columnName: 'med', columnType: 'string'},
      {columnName: 'det', columnType: 'string'}
    ];

    this.tBasic.Header = header;
    this.tBasic.Body.push(body);
    this.tBasic.ConfigBody = configBody;
  }

  // Función set para la organización de datos de tabla tipo simple
  private setTableSimplecData() {

    // Estructura de configuración header por columna
    let header: TableHeaderModel[] = [
      { content: 'Id', columnName: 'id', order: 0, hidden: true},
      { content: 'Tipo de certificado', columnName: 'type', class: 'col-width-10', order: 1},
      { content: 'Programa', columnName: 'program', class: 'col-width-50', order: 2 },
      { content: 'Fecha de certificación', columnName: 'date', class: 'col-width-20', order: 3},
      { content: 'Estado del aprendiz', columnName: 'state', class: 'col-width-10', order: 4},
      { content: 'Descargar', columnName: 'download', class: 'col-width-10', order: 5}
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      {columnName: 'id', columnType: 'number'},
      {columnName: 'type', columnType: 'string', class: 'col-width-10 title'},
      {columnName: 'program', columnType: 'string', class: 'col-width-50'},
      {columnName: 'date', columnType: 'date', class: 'col-width-20'},
      {columnName: 'state', columnType: 'string', class: 'col-width-10'},
      {columnName: 'download', columnType: 'string', class: 'col-width-10'}
    ];

    // Inicialización de data
    const dataSimple = SIMPLE;
    // Ordena header respecto al orden registrado
    // header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort =  header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    header = headerSort;

    this.tSimple.Header = header;
    this.tSimple.ConfigBody = configBody;

    // Recorre datos de webservices
    for (const data of dataSimple) {
      const listElements = [];

      // Recorre configuración de header
      for (const config of header) {
        const cellData = data[config.columnName];
        const el: TableCellModel = { content: cellData };

        // Caso columna 'date'
        if (config.columnName === 'date') {
          el.content = this.convertStringToDate(cellData, '-');
        }
        // Caso columna 'download'
        if (config.columnName === 'download') {
          el.event = this.eventButton;
          el.class = 'govco-icon govco-icon-up-arrow-n btn btn-size-3 btn-transparent color-dodger-blue';
          el.type = 'button';
        }

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tSimple.Body.push(listElements);
    }
  }

  // Función set para la organización de datos de tabla tipo detail
  private setTableDetailcData() {

    // Estructura de configuración header por columna
    let header: TableHeaderModel[] = [
      { content: 'Id', columnName: 'id', hidden: true},
      { content: 'Nombre prestador', columnName: 'name', order: 1},
      { content: 'Código prestador', columnName: 'code', order: 2},
      { content: 'Departamento', columnName: 'state', order: 3},
      { content: 'Municipio', columnName: 'town', order: 4},
      { content: 'Dirección', columnName: 'address', order: 5},
      { content: 'Teléfono', columnName: 'telephone', order: 6}
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      {columnName: 'id', columnType: 'number'},
      {columnName: 'name', columnType: 'string'},
      {columnName: 'code', columnType: 'string'},
      {columnName: 'state', columnType: 'string'},
      {columnName: 'town', columnType: 'string'},
      {columnName: 'address', columnType: 'string'},
      {columnName: 'telephone', columnType: 'string'}
    ];

    // Inicialización de data
    const dataSimple = DETAILS;

    // Ordena header respecto al orden registrado
    // header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort =  header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    header = headerSort;

    this.tDetail.Header = header;
    this.tDetail.ConfigBody = configBody;

    // Recorre datos de webservices
    for (const data of dataSimple) {
      const listElements = [];

      // Recorre configuración de header
      for (const config of header) {
        const cellData = data[config.columnName];
        const el: TableCellModel = { content: cellData };

        // Caso columna 'name'
        if (config.columnName === 'name') {
          el.type = 'link-event';
          el.class = 'btn btn-low wspace-normal';
          el.event = this.openModal;
        }

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tDetail.Body.push(listElements);
    }

  }

  // Función set para la organización de datos de tabla tipo filter
  private setTableFilterData() {

    // Estructura de configuración header por columna
    let header: TableHeaderModel[] =  [
      { content: 'Id', columnName: 'id', order: 0, hidden: true },
      { content: 'Expediente', columnName: 'exp', class: 'col-width-10', order: 1 },
      { content: 'Nombre del producto', columnName: 'name', class: 'col-width-20', order: 2 },
      { content: 'Registro sanitario', columnName: 'register', class: 'col-width-10', order: 3},
      { content: 'Fecha de vencimiento', columnName: 'date', class: 'col-width-10', order: 4},
      { content: 'Modalidad', columnName: 'mod', class: 'col-width-15', order: 5 },
      { content: 'Titular(es)', columnName: 'titular', class: 'col-width-15', order: 6},
      { content: 'Estado registro', columnName: 'state', class: 'col-width-15', order: 7 },
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      {columnName: 'id', columnType: 'number'},
      {columnName: 'exp', columnType: 'string', class: 'col-width-10'},
      {columnName: 'name', columnType: 'string', class: 'col-width-20'},
      {columnName: 'register', columnType: 'string', class: 'col-width-10'},
      {columnName: 'date', columnType: 'date', class: 'col-width-10'},
      {columnName: 'mod',  columnType: 'string', class: 'col-width-15 '},
      {columnName: 'titular',  columnType: 'string', class: 'col-width-15'},
      {columnName: 'state', columnType: 'string', class: 'col-width-15'},
    ];

    // Estructura de configuración de filtros por nombre de columna
    const configFilter = [
      { columnName: 'name', type: 'order'},
      { columnName: 'state', type: 'filter-content'},
      { columnName: 'date', type: 'date'},
      { columnName: 'mod', type: 'filter-content'}
    ];

    // Inicialización de data
    const dataFilter = FILTER;

    // Ordena header
    // header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort =  header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    header = headerSort;
    
    this.tFilter.Header = header;
    this.tFilter.ConfigFilter = configFilter;
    this.tFilter.ConfigBody = configBody;

    // Recorre datos de webservices
    for (const data of dataFilter) {
      const listElements = [];

      // Recorre configuración de header
      for (const config of header) {
        const cellData = data[config.columnName];
        const el: TableCellModel = {
          content: cellData,
          class: data.state === 'Vigente' ? 'color-green' : 'color-govco'
        };

        if (config.columnName === 'exp') {
          el.type = 'link-event';
          el.class = 'btn btn-low';
          el.event = this.eventButton;
        }
        if (config.columnName === 'date') {
          el.content = this.convertStringToDate(cellData, '-');
        }
        listElements.push(el);
      }
      this.tFilter.Body.push(listElements);
    }
  }

  // Función de ejemplo para el llamado de funciones
  // e: Evento click
  // item: Fila seleccionada
  // index: Index de la fila seleccionada
  private eventButton(e, item, index) {}

  // Función de ejemplo para la apertura de modal
  // NOTA: Debe ser tipo anonima para que el contexto de la clase se mantenga
  openModal = (e, item, index) => {
    const modal = this.modalService.open(ModalDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modal.componentInstance.data = item;
  }

  // Función de ejemplo para convertir la fecha tipo string a Date.
  // str: Fecha tipo string ej: dd-mm-yyyy
  // character: Carácter para extraer los números de días, mes y año de la fecha
  private convertStringToDate(str, character) {
    const arrDate = str.split(character);
    const day = Number(arrDate[0]);
    const month = Number(arrDate[1]) - 1;
    const year = Number(arrDate[2]);
    return new Date(year, month, day);
  }

  // Función de ejemplo para la ejecución del componente de alertas
  getAlert(type: string) {
    this.modalAlertService.openNotificationDialog(
      'Título de prueba',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
      'Consequatur, iure? Nisi repellendus suscipit explicabo debitis ut,' +
      ' inventore a quas tempora odio nesciunt sunt dignissimos fugiat, nobis ' +
      ' reiciendis tenetur ratione ullam!',
       type,
      () => {
        console.log('Función a ejecutar');
      });
  }
}
