import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsonStrings from '@stringResources/tramites/aportes-parafiscales.json';
import { IdentificacionModel } from '../../models/identificacionModel';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/responseModel';
import { User } from '../../models/user';
import { AportesParafiscalesUtilsService } from '../../services/aportes-parafiscales-utils.service';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  invalidForm = false;
  failureRequest = false;
  messages: any;
  identificacionModel: IdentificacionModel;
  responseModel: ResponseModel;

  constructor(private fb: FormBuilder, private userService: UserService,
              private aportesParafiscalesUtils: AportesParafiscalesUtilsService,
              private modalService: ConfirmModalService,
              private router: Router) {
    this.form = this.fb.group({
      identificacion: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.messages = {
      searchEmpty: jsonStrings.messages.searchEmpty,
      advice: jsonStrings.messages.forgotPassword,
      help: jsonStrings.messages.help,
      failureRequest: ''
    };
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  forgotPassword() {
    // Error validación del formulario
    if (!this.form.valid) {
      this.invalidForm = true;
      return;
    }

    // Success validación del formulario
    // --Datos para enviar
    this.identificacionModel = {
      Identificacion: this.form.value.identificacion
    };

    // Petición POST
    this.aportesParafiscalesUtils.forgotPassword(this.identificacionModel).subscribe(
      // Success response
      response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          this.messages.failureRequest = this.responseModel.mensaje;
          window.scroll(0, 0);
          return;
        }
        // Salida
        this.failureRequest = false;
        this.modalService.openNotificationDialog(
          'Recordar contraseña exitoso',
          'Hemos enviado la información al correo electrónico registrado',
          'success',
          () => {
            this.router.navigate(['/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760']);
          });
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
        window.scroll(0, 0);
        return;
      },
    );
    this.invalidForm = false;
  }

}
