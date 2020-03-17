import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';
import { DETAILS } from '@shared/forms/services/table-details';

@Component({
  selector: 'app-respuesta-urt',
  templateUrl: './respuesta-urt.component.html',
  styleUrls: ['./respuesta-urt.component.scss']
})
export class RespuestaUrtComponent implements OnInit {
  public tDetail: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: []
  };
  
  ngOnInit(): void {
    this.setTableDetailcData();
  }
  constructor( private location: Location) {
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

        // Caso columna 'name'
        if (config.columnName === 'name') {
          el.type = 'link-event';
          el.class = 'btn btn-low wspace-normal';
        }

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tDetail.Body.push(listElements);
    }

  }
}
