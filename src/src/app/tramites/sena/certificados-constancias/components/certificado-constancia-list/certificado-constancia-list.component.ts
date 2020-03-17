import { Component, OnInit } from '@angular/core';
import { SenaUtilsService } from '../../services/sena-utils.service';
import { CertificadoConstancia } from '../../models/certificadoConstancia';
import { DatosSolicitante } from '../../models/datosSolicitante';
import { Router } from '@angular/router';
import jsonStrings from '@stringResources/tramites/certificados-constancias.json';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';

@Component({
  selector: 'app-certificado-constancia-list',
  templateUrl: './certificado-constancia-list.component.html',
  styleUrls: ['./certificado-constancia-list.component.scss']
})
export class CertificadoConstanciaListComponent implements OnInit {

  descarga = false;
  noticeMessage: string;
  certificadosConstancias: CertificadoConstancia[];
  SIMPLE: any[];
  datosSolicitante: DatosSolicitante;
  public tSimple: GovcoTableModel = {
    Header:  [],
    Body: [],
    ConfigBody: []
  };
  nombreAprendiz: string;

  constructor(private senaUtils: SenaUtilsService, private router: Router) {
  }

  ngOnInit() {

    this.noticeMessage = jsonStrings.messages.adobe;
    this.datosSolicitante = this.senaUtils.getDatosSolicitante();
    if (!this.datosSolicitante) {
      this.router.navigate(['servicios-y-tramites/SENA/certificados-y-constancias-academicas/T1033/']);
    }
    this.certificadosConstancias = this.senaUtils.getListCertificadosConstancias();
    if (this.datosSolicitante.registro !== undefined && this.datosSolicitante.registro !== '' && this.datosSolicitante.registro != null) {
      const certificado = this.certificadosConstancias.filter(x => x.IDCERT === this.datosSolicitante.registro)[0];
      this.datosSolicitante.tipoDocumento = certificado.TIPO_IDENT;
      this.datosSolicitante.documento = certificado.NRO_IDENT;
      this.nombreAprendiz = this.certificadosConstancias[0].NOMBRE_APRENDIZ;
    } else {
      this.nombreAprendiz = this.certificadosConstancias[0].NOMBRE_APRENDIZ;
    }
    this.SIMPLE = [];
    for (const data of this.certificadosConstancias) {
      var tipo = "Certificado";
      if(data.TIPO_ARCHIVO == 'E'){
        tipo = "Constancia";
      }
      var estado = "";
      if(data.FECHA_FIRMA){
        estado = "Firmado";
      }

      const fechaTime = data.FECHA_FIRMA.split(' ');
      const fecha = fechaTime[0].split('/');
      const d = fecha[0];
      const m = fecha[1];
      const a = fecha[2];
      const fechaFormat = d + '-' + m + '-' + a;

      var obj = {
        Id: data.IDCERT,
        type: tipo,
        program: data.NO_ORDEN + '-' + data.PROGRAMA,
        date: fechaFormat,
        state: estado,
        download: '',
        url: data.URLCERT
      };
      this.SIMPLE.push(obj);
    }
    this.setTableSimplecData();
  }
  msgDescargar() {
    this.descarga = true;
    window.scroll(0, 0);
    this.setStep('4');
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  // Función set para la organización de datos de tabla tipo simple
  private setTableSimplecData() {

    // Estructura de configuración header por columna
    let header: TableHeaderModel[] = [
      { content: 'Id', columnName: 'id', order: 0, hidden: true},
      { content: 'Tipo de certificado', columnName: 'type', class: 'col-width-15', order: 1},
      { content: 'Programa', columnName: 'program', class: 'col-width-25', order: 2 },
      { content: 'Fecha de certificación', columnName: 'date', class: 'col-width-20', order: 3},
      { content: 'Estado del aprendiz', columnName: 'state', class: 'col-width-15', order: 4},
      { content: 'Descargar', columnName: 'download', class: 'col-width-15', order: 5},
      { content: 'Url', columnName: 'url', order: 6, hidden: true}
    ];

    // Estructura de configuración del contenido por columna
    const configBody: TableConfigModel[] = [
      {columnName: 'id', columnType: 'number'},
      {columnName: 'type', columnType: 'string', class: 'col-width-15 title'},
      {columnName: 'program', columnType: 'string', class: 'col-width-25'},
      {columnName: 'date', columnType: 'date', class: 'col-width-20'},
      {columnName: 'state', columnType: 'string', class: 'col-width-15'},
      {columnName: 'download', columnType: 'string', class: 'col-width-15'},
      {columnName: 'url', columnType: 'string'},
    ];

    // Inicialización de data
    const dataSimple = this.SIMPLE;

    // Ordena header respecto al orden registrado
    // header = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
    let headerSort: TableHeaderModel[];
    headerSort = header.sort((a, b) => a.order !== undefined && b.order !== undefined ? a.order - b.order : -1);
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
          el.class = 'govco-icon govco-icon-down-arrow-n btn btn-size-3 btn-transparent color-dodger-blue';
          el.type = 'button';
        }

        // Agrega columna a fila listElements
        listElements.push(el);
      }
      // Agrega fila a body
      this.tSimple.Body.push(listElements);
    }
  }

  // Función de ejemplo para el llamado de funciones
  // e: Evento click
  // item: Fila seleccionada
  // index: Index de la fila seleccionada
  private eventButton(e, item, index) {
    window.location.href = item[6].content;
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

}
