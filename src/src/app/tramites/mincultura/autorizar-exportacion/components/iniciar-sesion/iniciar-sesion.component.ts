import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  formGroupLogin: FormGroup; 
  formControlUsuario:any;
  formControlPassword:any;

  typeButton: string = "password";
  public invalidForm: boolean = false;

  usuario: any;
  password: any;

  constructor(public service: AutorizarExportacionUtilService, public fb: FormBuilder, public modalService: NgbModal) {
    this.formGroupLogin = new FormGroup({
      formControlUsuario: new FormControl(),
      formControlPassword: new FormControl()
    });
    this.usuario='';
    this.password='';
  }
  
  open(content) {
    this.modalService.open(content, 
      { 
        size: 'lg', 
        backdrop: 'static',
        keyboard: false
    });
  }

  login() {
    if(this.usuario != '' || this.password != ''){
      this.invalidForm = true;
      return;
    }
    this.modalService.dismissAll();
    this.asignarVariables();

  }

  asignarVariables(){
    this.invalidForm = false; 
    this.service.asignarPaso(2);
    this.service.asignarpasoIngresar(1);
    this.service.asignarLlega(1);
  }

  ngOnInit() {
  }

  checkShowPassword() {
    this.typeButton = this.typeButton == "password" ? "input": "password";
  }

}
