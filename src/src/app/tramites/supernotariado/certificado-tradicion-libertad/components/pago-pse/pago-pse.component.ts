import { Component, OnInit } from '@angular/core';
import { PagoPseForm } from './pago-pse-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-pse',
  templateUrl: './pago-pse.component.html',
  styleUrls: ['./pago-pse.component.scss']
})
export class PagoPseComponent implements OnInit {

  PagoPseForm: PagoPseForm;
  pagoPseForm: FormGroup;
  invalidDatosForm: boolean = false;

  constructor(private router: Router) {
    this.PagoPseForm = new PagoPseForm();
    this.buildForm();
   }

  ngOnInit() {
  }

  buildForm() {
    this.pagoPseForm = this.PagoPseForm.getForm();
    this.setStep("2");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  cancelar() {
    this.router.navigate(["/supernotariado/generarCertificado"]);
  }


}