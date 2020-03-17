import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';

@Component({
  selector: 'app-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss']
})
export class RestaurarContrasenaComponent implements OnInit {

  showPasswordBool: any = {
    showpassword: "password",
    repeatPassword: "password"
  };
  messages: any;
  values: any;

  currentMessage: any = {
    type: "",
    title: "",
    message: ""
  }

  passwordInvalid: boolean = false;
  passwordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private modalService: ConfirmModalService, 
    private router: Router,
    private recaptchaService: RecaptchaService,
    private tramiteService: MinjusticiaUtilsService,
    private authService: AgendamientoAuthenticationService
  ) { 
    this.messages = {
      errorFormTitle: jsonStrings.messages["title-error"],
      errorForm : jsonStrings.messages["form-error"]
    }

  }

  ngOnInit() {
    let token = this.route.snapshot.paramMap.get("token");
    let username = this.route.snapshot.paramMap.get("username");

    if (token == undefined || username == undefined) {
      this.router.navigate([this.tramiteService.getTramiteUrl()]);
    }

    this.values =  {
      token: token,
      username: username
    }

    this.setPasswordForm();
  }

  setPasswordForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      recaptcha: new FormControl('', Validators.required)
    });

    this.passwordForm.setValidators(this.validatePassword());
  }

  validatePassword(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const pass = group.controls["password"];
      const passRepeat = group.controls["repeatPassword"];
      
      return pass.value === passRepeat.value ? null : { matchingInputs: false };
    }
  }

  showPassword(type: string){
    if (type == "password"){
      this.showPasswordBool.showpassword = 
        this.showPasswordBool.showpassword == "password" ? "input": "password";
    }else {
      this.showPasswordBool.repeatPassword = 
        this.showPasswordBool.repeatPassword == "password" ? "input": "password";
    }
  }

  passwordClick() {
    if(!this.passwordForm.valid){
      this.passwordInvalid = true;
      return;
    }
    this.passwordInvalid = false;

    let formValues = this.passwordForm.value;
    this.recaptchaService.validateServerKey(formValues.recaptcha).subscribe(
      (data) => {
        if (data["success"] === true){
          this.sendData(formValues);
        }else {
          this.showMessage(this.messages.errorFormTitle, this.messages.recatpchaError, "error");          
          return;
        }
      },
      (error) => {
        this.showMessage(this.messages.errorFormTitle, this.messages.recatpchaError, "error");
        return;
      }
    );
    return;
  }

  sendData(formValues: any): void {
    this.authService.restorePassword(this.values.username, 
        formValues.password,
        formValues.repeatPassword,
        this.values.token).subscribe(
      (data) => {
        this.passwordForm.get('recaptcha').setValue(null);   
        if (data["success"] === true){
          this.showSuccessMessage();
        }else {
          this.passwordInvalid = true;          
          this.showMessage(this.messages.errorFormTitle, this.messages.errorForm, "error");
          return;
        }
      },
      (error) => {
        this.passwordForm.get('recaptcha').setValue(null);   
        this.passwordInvalid = true;
        this.showMessage(this.messages.errorFormTitle, this.messages.errorMessage, "error");        
        return;
      }
    );
  } 

  showSuccessMessage(): void {
    this.modalService.openNotificationDialog(
      "Cambio de contraseña", 
      "Se ha cambiado correctamente la contraseña",
      "success",
      () => {
        //TODO: llamar getCitasAgendadas cuando exista el servicio
        this.router.navigate([this.tramiteService.getTramiteUrl()]);
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
