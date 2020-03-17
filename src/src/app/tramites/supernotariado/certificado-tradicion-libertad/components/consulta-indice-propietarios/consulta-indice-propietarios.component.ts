import { Component, OnInit } from '@angular/core';
import { ConsultaChipForm, ConsultaDocumentoIdentificacionForm, ConsultaNombresApellidosForm, ConsultaRazonSocialForm } from './consulta-indice-propietarios-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-indice-propietarios',
  templateUrl: './consulta-indice-propietarios.component.html',
  styleUrls: ['./consulta-indice-propietarios.component.scss']
})

export class ConsultaIndicePropietariosComponent implements OnInit {

  ConsultaChipForm: ConsultaChipForm;
  consultaChipForm: FormGroup;
  invalidChipForm: boolean = false;

  ConsultaDocumentoIdentificacionForm: ConsultaDocumentoIdentificacionForm;
  consultaDocumentoIdentificacionForm: FormGroup;
  invalidDocIdentForm: boolean = false;
  public listTipoDocumento = [{ text: 'Cédula ciudadanía', value: 1}, { text: 'Tarjeta de identidad', value: 2}];

  ConsultaNombresApellidosForm: ConsultaNombresApellidosForm;
  consultaNombresApellidosForm: FormGroup;
  invalidNombresApellidosForm: boolean = false;

  ConsultaRazonSocialForm: ConsultaRazonSocialForm;
  consultaRazonSocialForm: FormGroup;
  invalidRazonSocialForm: boolean = false;

  constructor(private router: Router) {
    this.ConsultaChipForm = new ConsultaChipForm();
    this.ConsultaDocumentoIdentificacionForm = new ConsultaDocumentoIdentificacionForm();
    this.ConsultaNombresApellidosForm = new ConsultaNombresApellidosForm();
    this.ConsultaRazonSocialForm = new ConsultaRazonSocialForm();
    this.buildForm();
    this.getParams();
  }

  ngOnInit() {
  }

  buildForm() {
    this.consultaChipForm = this.ConsultaChipForm.getForm();
    this.consultaDocumentoIdentificacionForm = this.ConsultaDocumentoIdentificacionForm.getForm();
    this.consultaNombresApellidosForm = this.ConsultaNombresApellidosForm.getForm();
    this.consultaRazonSocialForm = this.ConsultaRazonSocialForm.getForm();
  }

  getParams() {
  }




  cancelarChip() {
    this.resetChipForm();
  }

  resetChipForm() {
    this.consultaChipForm.reset();
    this.invalidChipForm = false;
  }

  // 1. Consulta por Documento de Identificación del propietario 
  buscarDocIdent() {
    if (!this.ConsultaDocumentoIdentificacionForm.isValid()) {
      this.invalidDocIdentForm = true;
      return;
    }

    this.router.navigate(["/supernotariado/resumenConsulta"], 
    {state : { 
      tipoConsulta: "1. Consulta por Documento de Identificación del propietario" 
    }});
  }
  // 2. Consulta por Nombres y/o Apellidos del propietario 
  buscarNombresApellidos() {
    if (!this.ConsultaNombresApellidosForm.isValid()) {
      this.invalidNombresApellidosForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/resumenConsulta"], 
    {state : { 
      tipoConsulta: "2. Consulta por Nombres y/o Apellidos del propietario" 
    }});
  }
  // 3. Consulta por Razón Social 
  buscarRazonSocial() {
    if (!this.ConsultaRazonSocialForm.isValid()) {
      this.invalidRazonSocialForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/resumenConsulta"], 
    {state : { 
      tipoConsulta: "3. Consulta por Razón Social" 
    }});
  }
  // 4. Consulta por # CHIP o Matrícula Catastral 
  buscarChip() {
    if (!this.ConsultaChipForm.isValid()) {
      this.invalidChipForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/resumenConsulta"], 
    {state : { 
      tipoConsulta: "4. Consulta por # CHIP o Matrícula Catastral" 
    }});
  }

  cancelarDocIdent() {
    this.resetDocIdentForm();
  }

  resetDocIdentForm() {
    this.consultaDocumentoIdentificacionForm.reset();
    this.invalidDocIdentForm = false;
  }




  cancelarNombresApellidos() {
    this.resetNombresApellidosForm();
  }

  resetNombresApellidosForm() {
    this.consultaNombresApellidosForm.reset();
    this.invalidNombresApellidosForm = false;
  }




  cancelarRazonSocial() {
    this.resetRazonSocialForm();
  }

  resetRazonSocialForm() {
    this.consultaRazonSocialForm.reset();
    this.invalidRazonSocialForm = false;
  }
}
