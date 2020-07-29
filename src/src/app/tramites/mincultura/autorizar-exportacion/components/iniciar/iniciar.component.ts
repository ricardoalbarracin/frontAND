import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss']
})
export class IniciarComponent implements OnInit {

  formGroupLogin: FormGroup;
  formControlUsuario: any;
  formControlPassword: any;

  typeButton = 'password';
  public invalidForm = false;

  usuario: any;
  password: any;

  constructor(
    public service: AutorizarExportacionUtilService, public fb: FormBuilder, public modalService: NgbModal, private router: Router) {
    this.formGroupLogin = new FormGroup({
      formControlUsuario: new FormControl(),
      formControlPassword: new FormControl()
    });
    this.usuario = '';
    this.password = '';
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
    if (this.usuario !== '' || this.password !== '') {
      this.invalidForm = true;
    }
    this.modalService.dismissAll();
    this.router.navigate(['/mincultura/autorizar-exportacion/ingresar-solicitud']);
    // this.asignarVariables();

  }

  asignarVariables() {
    this.invalidForm = false;
    this.service.asignarPaso(1);
    this.service.asignarpasoIngresar(1);
    this.service.asignarLlega(1);
  }

  ngOnInit() {
  }

  checkShowPassword() {
    this.typeButton = this.typeButton === 'password' ? 'input' : 'password';
  }

}
