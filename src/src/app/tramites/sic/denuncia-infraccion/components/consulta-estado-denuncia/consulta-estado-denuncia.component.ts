import { Component, OnInit } from '@angular/core';
import { GovcoTableModel, TableCellModel, TableConfigModel, TableHeaderModel } from '@shared/forms/models/table.model';
import { FormGroup } from '@angular/forms';
import { ConsultaEstadoDenunciaForm } from './consulta-estado-denuncia-form'
import {SicUtilsService} from '../../services/sic-utils.service'

@Component({
  selector: 'app-consulta-estado-denuncia',
  templateUrl: './consulta-estado-denuncia.component.html',
  styleUrls: ['./consulta-estado-denuncia.component.scss']
})
export class ConsultaEstadoDenunciaComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: ConsultaEstadoDenunciaForm;
  invalidForm: boolean = false;
  listaAnyo: any = [];

  constructor(private sicUtilsService: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultaEstadoDenunciaForm();
    this.buildForm();
    this.llenarAnyo();
  }

  llenarAnyo() {
    for (let i = 2020; i >= 1900; i--)
      this.listaAnyo.push({ text: i.toString(), value: i.toString() })
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  consultar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.sicUtilsService.setdesplegarGrilla = true;
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  nueva_consulta() {
    this.seleccionForm.controls['anyo'].setValue('');
    this.seleccionForm.controls['numero_radicado'].setValue('');
    this.sicUtilsService.setdesplegarGrilla = false;
  }

}
