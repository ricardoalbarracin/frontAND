import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

import {
  GovcoTableModel,
  TableCellModel,
  TableConfigModel,
  TableHeaderModel,
} from "@shared/forms/models/table.model";
//import { consulta } from "../../models/consultamodels";

const DETAILS: any[] = [
  {
    radicado: 1,
    tipotramite: "Autorizacion",
    fecharadicado: "12-12-2019",
    dicTerritorial: "centro",
    estado: "activa",
    actTramite: "Actualizar",
  },
  {
    radicado: 2,
    tipotramite: "Registro",
    fecharadicado: "12-12-2019",
    dicTerritorial: "centro",
    estado: "activa",
    actTramite: "Actualizar",
  },
  {
    radicado: 3,
    tipotramite: "Registro",
    fecharadicado: "12-12-2019",
    dicTerritorial: "centro",
    estado: "activa",
    actTramite: "Actualizar",
  },
  {
    radicado: 4,
    tipotramite: "Autorizacion",
    fecharadicado: "12-12-2019",
    dicTerritorial: "centro",
    estado: "activa",
    actTramite: "Actualizar",
  },
];

@Component({
  selector: "app-resultado",
  templateUrl: "./resultado.component.html",
  styleUrls: ["./resultado.component.scss"],
})
export class ResultadoComponent implements OnInit {

  items: any[] = DETAILS;

  public tBasic: GovcoTableModel = {
    Header: [],
    Body: [],
    ConfigBody: [],
  };

  public tSimple: GovcoTableModel = {
    Header: [],
    Body: [],
    ConfigBody: [],
  };

  public tDetail: GovcoTableModel = {
    Header: [],
    Body: [],
    ConfigBody: [],
  };

  public tFilter: GovcoTableModel = {
    Header: [],
    Body: [],
    ConfigBody: [],
    ConfigFilter: [],
  };

  constructor() {}

  ngOnInit() {
    this.setTableDetailcData();
  }

  private setTableDetailcData() {
    // Estructura de configuración header por columna
    let header: TableHeaderModel[] = [
      { content: "No. Radicado", columnName: "radicado", order: 1 },
      { content: "Tipo de Trámite", columnName: "tipotramite", order: 2 },
      { content: "Fecha de radicado", columnName: "fecharadicado", order: 3 },
      { content: "Dic. Territorial", columnName: "dicTerritorial", order: 4 },
      { content: "Estado", columnName: "estado", order: 5 },
      { content: "Actualizar Tramite", columnName: "actTramite", order: 6 },
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      { columnName: "radicado", columnType: "number" },
      { columnName: "tipotramite", columnType: "string" },
      { columnName: "fecharadicado", columnType: "string" },
      { columnName: "dicTerritorial", columnType: "string" },
      { columnName: "estado", columnType: "string" },
      { columnName: "address", columnType: "string" },
      { columnName: "actTramite", columnType: "string" },
    ];

    // Inicialización de data
    const dataSimple = DETAILS;

    // Ordena header respecto al orden registrado
    // header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort = header.sort((a, b) =>
      a.order !== undefined && b.order !== undefined ? a.order - b.order : -1
    );
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
        if (config.columnName === "actTramite") {
          el.type = "link-event";
          el.class = "btn btn-low wspace-normal";
          //el.event = this.openModal;
        }

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tDetail.Body.push(listElements);
    }
  }
}
