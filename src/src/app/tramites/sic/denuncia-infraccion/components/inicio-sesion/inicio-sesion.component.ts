import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InicioSesionForm } from './inicio-sesion-form';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/loginModel';
import { ResponseModel } from '../../models/responseModel';
import { SicUtilsService } from '../../services/sic-utils.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { requestUsuario } from '../../models/sic-models';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  typeButton: string = "password";
  seleccionForm: FormGroup;
  seleccionSolucionForm: InicioSesionForm;
  invalidForm = false;
  loginModel: LoginModel;
  responseModel: ResponseModel;
  failureRequest = false;
  mensaje_error: string;
  reqUsuario: requestUsuario;

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.mensaje_error = jsonStrings.messages.error_login;
    this.seleccionSolucionForm = new InicioSesionForm();
    this.buildForm();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  checkShowPassword() {
    this.typeButton = this.typeButton == "password" ? "input" : "password";
  }

  registrarme() {
    this.router.navigate(['/sic/registro_nuevo_usuario']);
  }

  olvidar_password() {
    this.router.navigate(['/sic/reestablecer_contrasena']);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.seleccionForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.error(name);
      }
    }
    return invalid;
  }

  autenticarUsuario() {
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid()) {      
      this.reqUsuario = {
        login: this.seleccionForm.value.username,
        password: this.seleccionForm.value.password,
        sistema: "RC"
      }
      this.sicUtils.postAutenticarUsuario(this.reqUsuario)
        .subscribe((data: any) => {
          if (data > 0) {
            sessionStorage.setItem('user',data)
            this.router.navigate(['/sic/alerta_inicio']);
          }
          else {
            this.invalidForm = true;
            return;
          }
        }, (error) => {
          console.error(error);
        }
        );
    }    
    else{
      this.invalidForm = true;
      return;  
    }    
  }

  ingresar() {

    if (!this.seleccionForm.valid) {
      this.invalidForm = true;
      return;
    }
    this.router.navigate(['/sic/alerta_inicio']);

    /*this.loginModel = {
      User: this.seleccionForm.value.username,
      Password: this.seleccionForm.value.password
    };

    this.SciUtils.Autenticar(this.loginModel).subscribe(
      response => {
        this.responseModel = response;
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          window.scroll(0, 0);
          return;
        }
        this.failureRequest = false;
        this.userService.setUserLoggedIn(this.seleccionForm.value.username);
        this.router.navigate(['/sic/alerta_inicio']);
      },
      error => {
        this.failureRequest = true;
        window.scroll(0, 0);
        return;
      },
    );
    this.invalidForm = false;*/
  }

}
