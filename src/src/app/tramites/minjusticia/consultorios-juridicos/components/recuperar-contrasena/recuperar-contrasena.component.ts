import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ConfirmModalService } from  '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent implements OnInit {

  userInvalid: boolean = false;
  messages: any;
  user: FormGroup;

  currentMessage: any = {
    type: "",
    title: "",
    message: ""
  }

  constructor(private modalService: ConfirmModalService, 
      private router: Router,
      private recaptchaService: RecaptchaService,
      private authService: AgendamientoAuthenticationService) {
    this.messages = {
      errorFormTitle: jsonStrings.messages["title-error"],
      errorForm : jsonStrings.messages["form-error"]
    }
  }

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl('', Validators.required),
      recaptcha: new FormControl('', Validators.required)
    });
  }

  userClick() {
    if (!this.user.valid){
      this.userInvalid = true;
      return;
    }
    this.userInvalid = false;

    let formValues = this.user.value;
    this.recaptchaService.validateServerKey(formValues.recaptcha).subscribe(
      (data) => {
        if (data["success"] === true){          
          this.sendData(formValues.username);
        }else {
          this.showMessage(this.messages.errorFormTitle, this.messages.errorMessage, "error");          
          return;
        }
        this.user.get('recaptcha').setValue(null);   
      },
      (error) => {
        this.user.get('recaptcha').setValue(null);   
        this.showMessage(this.messages.errorFormTitle, this.messages.errorMessage, "error");
        return;
      }
    );
  }

  sendData(username: string): void {
    this.authService.restorePasswordRequest(username).subscribe(
      (data) => {
        this.user.get('recaptcha').setValue(null);   
        if (data["success"] === true){
          this.showSuccessMessage(data["message"]);
        }else {
          const message = data["message"] != "" ? data["message"]: this.messages.errorForm;

          this.userInvalid = true;          
          this.showMessage(this.messages.errorFormTitle, message, "error");
          return;
        }
      },
      (error) => {
        this.user.get('recaptcha').setValue(null);   
        this.userInvalid = true;
        this.showMessage(this.messages.errorFormTitle, this.messages.errorMessage, "error");        
        return;
      }
    );
  }

  showSuccessMessage(message: string): void {
    this.modalService.openNotificationDialog(
      "Cambio de contraseña", 
      message,
      "success",
      () => {
      })
  }

  //Muestra los mensajes de notificación
  private showMessage(title: string, message: string, type: string) {
    this.currentMessage.type = type;
    this.currentMessage.title = title;
    this.currentMessage.message = message;
    window.scroll(0, 0);
  }


}