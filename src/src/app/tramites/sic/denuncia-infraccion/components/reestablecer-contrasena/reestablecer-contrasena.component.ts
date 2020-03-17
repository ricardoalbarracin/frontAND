import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReestablecerContrasenaForm } from './reestablecer-contrasena-form'
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';

@Component({
  selector: 'app-reestablecer-contrasena',
  templateUrl: './reestablecer-contrasena.component.html',
  styleUrls: ['./reestablecer-contrasena.component.scss']
})
export class ReestablecerContrasenaComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm : ReestablecerContrasenaForm;
  busquedavacia: string;
  invalidForm: boolean = false;

  constructor() { }

   ngOnInit() {
    this.seleccionSolucionForm = new ReestablecerContrasenaForm();
    this.buildForm();
    this.busquedavacia =jsonStrings.messages.error_reestablecer_password;
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();    
  }

  enviar(){
    if(!this.seleccionForm.valid){
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false; 
  }

  

}
