import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsultaEstadoDenunciaForm } from './consulta-estado-denuncia-form';
import {SicUtilsService} from '../../services/sic-utils.service';
import {ConsultaRadicacion} from '../../models/sic-models';
import { GovcoTableModel, TableCellModel } from '@shared/forms/models/table.model';

@Component({
  selector: 'app-consulta-estado-denuncia',
  templateUrl: './consulta-estado-denuncia.component.html',
  styleUrls: ['./consulta-estado-denuncia.component.scss']
})
export class ConsultaEstadoDenunciaComponent implements OnInit {
  public tDetail: GovcoTableModel;

  consultaRadicacion: ConsultaRadicacion;
  seleccionForm: FormGroup;
  seleccionSolucionForm: ConsultaEstadoDenunciaForm;
  invalidForm: boolean;
  listaAnyo: any = [];
  results: any[] = [];
  numero: any;
  control: any;
  url: any;
  idsTablaSedes: string[] = [
    'anio',
    'numero',
    'control',
    'consecutivo',
   ];
  private show: boolean;

  constructor(private sicUtilsService: SicUtilsService) {
    this.setTablaDetalleDatos();
  }

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultaEstadoDenunciaForm();
    this.buildForm();
    this.llenarAnyo();
    this.inicializarTablaDetalleSedes();
    this.setTablaDetalleDatos();

  }
  public inicializarTablaDetalleSedes() {
    this.tDetail = {
      Header: [
        {  content: 'Año', filter: false, typeFilter: ''},
        {  content: 'Número', filter: false, typeFilter: ''},
        {  content: 'Contral', filter: false, typeFilter: ''},
        {  content: 'Consecutivo', filter: false, typeFilter: ''},
      ],
      Body: [],
      ConfigHeader: [],
      ConfigBody: []
    };
  }
  consultar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.consultaRadicacion = {
        anio: this.seleccionForm.value.anyo.value,
        numero: this.seleccionForm.value.numero_radicado
      };
      console.log( this.consultaRadicacion );
      this.sicUtilsService.getRadicado(this.consultaRadicacion).subscribe(
        response => {
          console.error(response);
          if (response) {
            this.show = true;
            this.results = response.radicaciones;
            sessionStorage.setItem('dataSimple', JSON.stringify(this.results));
            this.inicializarTablaDetalleSedes();
            this.setTablaDetalleDatos();
          } else {
            console.error('No responde el servicio');
          }
        },
        error => {
          console.error(error);
        },
      );
    } else {
      this.invalidForm = true;
      return;
    }
  }

  public setTablaDetalleDatos() {
    for (let indexDatos = 0; indexDatos < this.results.length; indexDatos++) {
      const listElements = [];
      const data =  Object.keys(this.results[indexDatos]);
      sessionStorage.setItem('data', JSON.stringify(data));

      for (let indexIds = 0; indexIds < this.idsTablaSedes.length; indexIds++) {
        // Se recorre la fila, para obtener el orden especifico que se requiere
        for (let j = 0; j < data.length; j++) {
          const element = this.results[indexDatos][data[j]];
          const el: TableCellModel = {
            content: element
          };
          if (data[j] === this.idsTablaSedes[indexIds]) {
            listElements.push(el);
          }
        }
      }

      // Se adiciona la fila, con el orden de campos especificado
      this.tDetail.Body.push(listElements);
      sessionStorage.setItem('data2', JSON.stringify(listElements));
    }
  }

  llenarAnyo() {
    for (let i = 21; i >= 18; i--) {
      this.listaAnyo.push({ text: i.toString(), value: i.toString() });
    }
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }
  nueva_consulta() {
    this.seleccionForm.controls.anyo.setValue('');
    this.seleccionForm.controls.numero_radicado.setValue('');
    this.sicUtilsService.setdesplegarGrilla = true;
  }
}
