import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsonStrings from '@stringResources/tramites/aportes-parafiscales.json';
import { AportesParafiscalesUtilsService } from '../../services/aportes-parafiscales-utils.service';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { InputListModel } from '../../models/inputListModel';
import { RegisterModel } from '../../models/registerModel';
import { ResponseModel } from '../../models/responseModel';
import { InformativoModel } from '../../models/informativoModel';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import appJson from '@stringResources/app-strings.json';

@Component({
  selector: 'app-registro-icbf',
  templateUrl: './registro-icbf.component.html',
  styleUrls: ['./registro-icbf.component.scss']
})
export class RegistroIcbfComponent implements OnInit {

    form: FormGroup;
    messages: any;
    typeButton = 'password';
    typeButtonConfirmation = 'password';
    codigosOperadores: any[];
    periodos: any[];
    anioPeriodos: SelectListItemModel[] = [];
    invalidForm = false;
    failureRequest = false;
    inputListOperador: InputListModel;
    registerModel: RegisterModel;
    responseModel: ResponseModel;
    informativoModel: InformativoModel;
    anioActual: number;


  constructor(private fb: FormBuilder, private aportesParafiscalesUtils: AportesParafiscalesUtilsService,
              private modalService: ConfirmModalService, private router: Router, private recaptchaService: RecaptchaService) {
    this.form = this.fb.group({
      identificacion: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(50), Validators.pattern(appJson.regexp.email)])],
      planilla: ['', Validators.compose([Validators.required, Validators.pattern(appJson.regexp.numeric)])],
      codigoOperador: ['', Validators.required],
      anoPeriodo: ['', Validators.required],
      mesPeriodo: ['', Validators.required],
      contrasena: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{10,200}')])],
      contrasenaConfirmacion: ['', Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{10,200}')])],
      preguntaRecordacion: ['', Validators.required],
      respuesta: ['', Validators.required],
      autorizacionDatos: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit() {

    const fecha = new Date();
    this.anioActual = fecha.getFullYear();

    this.getCodigosOperadores();
    this.getPeriodos();
    this.getInformativos();
    this.getAniosPeridos();

    this.messages = {
      advice: jsonStrings.messages.advice,
      searchEmpty: jsonStrings.messages.searchEmpty,
      failureRequest: '',
      emailSend: jsonStrings.messages.emailSend,
      help: jsonStrings.messages.help,
      password: jsonStrings.messages.password
    };

  }

  checkShowPassword() {
    this.typeButton = this.typeButton === 'password' ? 'text' : 'password';
  }

  checkShowPasswordConfirmation() {
    this.typeButtonConfirmation = this.typeButtonConfirmation === 'password' ? 'text' : 'password';
  }

  getCodigosOperadores() {
     this.inputListOperador = {
      idEntidad: 1,
      idLista: 1
    };

     this.aportesParafiscalesUtils.getListas(this.inputListOperador).subscribe(
      // Success response
      response => {
          this.codigosOperadores = response;
          this.setStep('2');
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getPeriodos() {
    this.inputListOperador = {
     idEntidad: 1,
     idLista: 2
   };

    this.aportesParafiscalesUtils.getListas(this.inputListOperador).subscribe(
     // Success response
     response => {
         this.periodos = response;
     },
     // Failure response
     error => {
       console.error(error);
     },
   );
 }

  getAniosPeridos() {
   this.inputListOperador = {
      idEntidad: 0,
      idLista: 3
    };
   this.aportesParafiscalesUtils.getListas(this.inputListOperador).subscribe(
      // Success response
      response => {
          this.anioPeriodos = response;
      },
      // Failure response
      error => {
        console.error(error);
      },
    );
  }

  getInformativos() {
    this.informativoModel = {
     idEntidad: 1,
     idInformativo: 1,
     url: null
   };

    this.aportesParafiscalesUtils.getInformativos(this.informativoModel).subscribe(
     // Success response
     response => {
         this.informativoModel = response;
     },
     // Failure response
     error => {
       console.error(error);
     },
   );
 }

 setStep(step: string) {
  const s = document.getElementsByTagName('govco-area-servicios');
  s[0].setAttribute('steptramites', step);
}

  registrar() {
    // Error validación del formulario
    if (!this.form.valid) {
      this.invalidForm = true;
      this.form.get('recaptcha').setValue(null);
      return;
    }

    this.recaptchaService.validateServerKey(this.form.value.recaptcha).subscribe(
      (data) => {
        if (data["success"] == true){
          this.sendData();
        }else {
          this.failureRequest = true;
          this.messages.failureRequest = data["message"];
          window.scroll(0, 0);
          this.form.get('recaptcha').setValue(null);
          return;
        }
      },
      (error) => {
        this.invalidForm = true;
      }
    );

    this.invalidForm = false;
  }


  sendData(): void {
    // --Datos para enviar
    let anioPerido = this.anioActual;
    if (this.form.value.anoPeriodo.value) {
      anioPerido = this.form.value.anoPeriodo.value;
    }

    this.registerModel = {
      identificacion: this.form.value.identificacion,
      email: this.form.value.email,
      planilla: Number(this.form.value.planilla),
      codigoOperador: this.form.value.codigoOperador.value,
      anoPeriodo: anioPerido,
      mesPeriodo: this.form.value.mesPeriodo.value,
      Contrasena: this.form.value.contrasena,
      ContrasenaConfirmacion: this.form.value.contrasenaConfirmacion,
      preguntaRecordacion: this.form.value.preguntaRecordacion,
      respuesta: this.form.value.respuesta,
      autorizacionDatos: this.form.value.autorizacionDatos,
      recaptcha: this.form.value.recaptcha
    };
    console.log(this.registerModel);

    // Petición POST
    this.aportesParafiscalesUtils.registrar(this.registerModel).subscribe(
      // Success response
      response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          this.messages.failureRequest = this.responseModel.mensaje;
          window.scroll(0, 0);
          this.form.get('recaptcha').setValue(null);
          return;
        }
        // Salida
        this.failureRequest = false;
        this.modalService.openNotificationDialog(
          'Registro exitoso',
          'Hemos enviado una confirmación al correo electrónico registrado',
          'success',
          () => {
            this.router.navigate(['/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760']);
          });
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.messages.failureRequest = this.messages.searchEmpty;
        this.form.get('recaptcha').setValue(null);
        window.scroll(0, 0);
        return;
      },
    );
  }

  limpiar() {
    this.form.reset();
  }

}
