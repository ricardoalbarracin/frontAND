import { Component, OnInit } from '@angular/core';
import { DatosSolicitanteForm } from './datos-solicitante-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-solicitante',
  templateUrl: './datos-solicitante.component.html',
  styleUrls: ['./datos-solicitante.component.scss']
})
export class DatosSolicitanteComponent implements OnInit {

  DatosSolicitanteForm: DatosSolicitanteForm;
  datosSolicitanteForm: FormGroup;
  invalidDatosForm: boolean = false;


  constructor(private router: Router) {
    this.DatosSolicitanteForm = new DatosSolicitanteForm();
    this.buildForm();
    this.getParams();
  }

  ngOnInit() {
  }

  buildForm() {
    this.datosSolicitanteForm = this.DatosSolicitanteForm.getForm();
  }

  getParams() {
  }

  guardar() {
    if (!this.DatosSolicitanteForm.isValid()) {
      this.invalidDatosForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/resumenConsulta"]);
  }
}