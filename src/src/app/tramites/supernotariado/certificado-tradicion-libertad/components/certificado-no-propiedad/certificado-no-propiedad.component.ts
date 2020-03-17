import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CertificadoNoPropiedadForm }  from './certificado-no-propiedad-forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado-no-propiedad',
  templateUrl: './certificado-no-propiedad.component.html',
  styleUrls: ['./certificado-no-propiedad.component.scss']
})
export class CertificadoNoPropiedadComponent implements OnInit {

  CertificadoNoPropiedadForm: CertificadoNoPropiedadForm;
  certificadoNoPropiedadForm: FormGroup;
  
  constructor(private router: Router) { 
    this.CertificadoNoPropiedadForm = new CertificadoNoPropiedadForm();
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.certificadoNoPropiedadForm = this.CertificadoNoPropiedadForm.getForm();
    this.setStep("1");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  nuevaBusqueda() {     
    this.router.navigate(["/supernotariado/consultaIndicePropietarios"]);
  }

}