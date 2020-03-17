import { Component, OnInit } from '@angular/core';
import { InfoNumeroPinForm } from './info-numero-pin-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-numero-pin',
  templateUrl: './info-numero-pin.component.html',
  styleUrls: ['./info-numero-pin.component.scss']
})
export class InfoNumeroPinComponent implements OnInit {
  InfoNumeroPinForm: InfoNumeroPinForm;
  infoNumeroPinForm: FormGroup;
  invalidDatosForm: boolean = false;

  constructor(private router: Router) {
    this.InfoNumeroPinForm = new InfoNumeroPinForm();
    this.buildForm();
   }

  ngOnInit() {
  }

  buildForm() {
    this.infoNumeroPinForm = this.InfoNumeroPinForm.getForm();
    this.setStep("4");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  nuevaValidacion() {
    this.router.navigate(["/supernotariado/validacionCertificado"]);
  }

}