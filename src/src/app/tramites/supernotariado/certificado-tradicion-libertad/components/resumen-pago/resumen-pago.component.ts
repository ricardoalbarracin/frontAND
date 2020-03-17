import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResumenPagoForm }  from './resumen-pago-forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-pago',
  templateUrl: './resumen-pago.component.html',
  styleUrls: ['./resumen-pago.component.scss']
})
export class ResumenPagoComponent implements OnInit {

  ResumenPagoForm: ResumenPagoForm;
  resumenPagoForm: FormGroup;
  
  constructor(private router: Router) { 
    this.ResumenPagoForm = new ResumenPagoForm();
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.resumenPagoForm = this.ResumenPagoForm.getForm();
    this.setStep("1");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  terminar() {     
    this.router.navigate(["/supernotariado/consultaIndicePropietarios"]);
  }

}