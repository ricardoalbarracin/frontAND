import { Component, OnInit } from '@angular/core';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';

@Component({
  selector: 'app-grilla-consulta',
  templateUrl: './grilla-consulta.component.html',
  styleUrls: ['./grilla-consulta.component.scss']
})
export class GrillaConsultaComponent implements OnInit {

  public tDetail: GovcoTableModel = {
    Header: [],
    Body: [],
    ConfigBody: []
  };

  DETAILS: any[] = [
    {
      anyo: 2018,
      numero: 12,
      ctrl: 2,
      cons: 0,
      sec: 12,
      tramite: 'Nombre trámite',
      evento: 9,
      tipo: 'EN',
      actuacion: 'Dato',
      fecha: '12-12-2019',
      solicitante: 'Nombre persona',
      asignacion: 'Accion'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.setTableDetailcData();
  }

  // Función set para la organización de datos de tabla tipo detail
  private setTableDetailcData() {

    // Estructura de configuración header por columna
    let header: TableHeaderModel[] = [
      { content: 'Año', columnName: 'anyo', order: 1 },
      { content: 'Número', columnName: 'numero', order: 2 },
      { content: 'Ctrl', columnName: 'ctrl', order: 3 },
      { content: 'Cons', columnName: 'cons', order: 4 },
      { content: 'Sec Eve', columnName: 'sec', order: 5 },
      { content: 'Trámite', columnName: 'tramite', order: 6 },
      { content: 'Evento', columnName: 'evento', order: 7 },
      { content: 'Tipo', columnName: 'tipo', order: 8 },
      { content: 'Actuación', columnName: 'actuacion', order: 9 },
      { content: 'Fecha', columnName: 'fecha', order: 10 },
      { content: 'Solicitante', columnName: 'solicitante', order: 11 },
      { content: 'Asignación', columnName: 'asignacion', order: 12 }
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      { columnName: 'anyo', columnType: 'number' },
      { columnName: 'numero', columnType: 'number' },
      { columnName: 'ctrl', columnType: 'number' },
      { columnName: 'cons', columnType: 'number' },
      { columnName: 'sec', columnType: 'numero' },
      { columnName: 'tramite', columnType: 'string' },
      { columnName: 'evento', columnType: 'number' },
      { columnName: 'tipo', columnType: 'string' },
      { columnName: 'actuacion', columnType: 'string' },
      { columnName: 'fecha', columnType: 'string' },
      { columnName: 'solicitante', columnType: 'string' },
      { columnName: 'asignacion', columnType: 'string' }
    ];

    // Inicialización de data
    const dataSimple = this.DETAILS;

    // Ordena header respecto al orden registrado
    header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);

    this.tDetail.Header = header;
    this.tDetail.ConfigBody = configBody;

    // Recorre datos de webservices
    for (const data of dataSimple) {
      const listElements = [];

      // Recorre configuración de header
      for (const config of header) {
        const cellData = data[config.columnName];
        const el: TableCellModel = { content: cellData };

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tDetail.Body.push(listElements);
    }

  }


}
