import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InicioSesionForm } from './inicio-sesion-form';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { requestUsuario } from '../../models/sic-models';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {

  typeButton = 'password';
  seleccionForm: FormGroup;
  seleccionSolucionForm: InicioSesionForm;
  invalidForm = false;
  failureRequest = false;
  ErrorMessage: string;
  reqUsuario: requestUsuario;

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.ErrorMessage = jsonStrings.messages.error_login;
    this.seleccionSolucionForm = new InicioSesionForm();
    this.buildForm();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  checkShowPassword() {
    // tslint:disable-next-line:triple-equals
    this.typeButton = this.typeButton == 'password' ? 'input' : 'password';
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
        sistema: 'SL'
      };
      this.sicUtils.postAutenticarUsuario(this.reqUsuario)
        .subscribe((data: any) => {
          if (data > 0) {
            sessionStorage.setItem('user', data);
            this.router.navigate(['/sic/alerta_inicio']);
          } else {
            this.invalidForm = true;
            return;
          }
        }, (error) => {
          console.error(error);
        }
        );
    } else {
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
  }

}
