import { Component, OnInit } from '@angular/core';
import { ValidacionCertificadoForm } from './validacion-certificado-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validacion-certificado',
  templateUrl: './validacion-certificado.component.html',
  styleUrls: ['./validacion-certificado.component.scss']
})
export class ValidacionCertificadoComponent implements OnInit {

  ValidacionCertificadoForm: ValidacionCertificadoForm;
  validacionCertificadoForm: FormGroup;
  invalidDatosForm: boolean = false;

  constructor(private router: Router) {
    this.ValidacionCertificadoForm = new ValidacionCertificadoForm();
    this.buildForm();
   }

  ngOnInit() {
  }

  buildForm() {
    this.validacionCertificadoForm = this.ValidacionCertificadoForm.getForm();
    this.setStep("4");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  buscar() {
    if (!this.ValidacionCertificadoForm.isValid()) {
      this.invalidDatosForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/informacionPin"]);
  }

  cancelar() {
    this.validacionCertificadoForm.reset();
    this.invalidDatosForm = false;
  }
}
