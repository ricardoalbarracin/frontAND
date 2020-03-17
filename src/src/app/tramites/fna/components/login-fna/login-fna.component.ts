import { Component, OnInit } from '@angular/core';
import jsonStrings from '@stringResources/tramites/recibo-pago-credito.json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { dialogModal } from '@shared/dialog-modal/models/dialogModal';
import { ReciboPagoUtilsService } from '../../services/recibo-pago-utils.service';
import { LoginModel } from '../../models/loginModel';
import { Router } from '@angular/router';
import { utils } from 'protractor';
import { ResponseModel } from '../../models/responseModel';
import { CreditDataModel } from '../../models/creditDataModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-fna',
  templateUrl: './login-fna.component.html',
  styleUrls: ['./login-fna.component.scss']
})
export class LoginFnaComponent implements OnInit {

  public modalOptions: dialogModal[];

  invalidForm = false;
  form: FormGroup;
  messages: any;
  typeButton = 'password';
  loginModel: LoginModel;
  loginFailedAttempts = 0;
  responseModel: ResponseModel;  
  creditList: CreditDataModel[];
  failureRequest = false;

  tiposDocumento = [
                    { value: 'CC', text: 'CEDULA DE CIUDADANIA' },
                    { value: 'CD', text: 'CARNE DIPLOMATICO' },
                    { value: 'CE', text: 'CEDULA DE EXTRANJERIA'},
                    { value: 'NI', text: 'NIT PERSONAS NATURALES' },
                    { value: 'NU', text: 'NUMERO UNICO DE IDENTIFICresponseModelACION PERSONAL NUIP' },
                    { value: 'PA', text: 'PASAPORTE' },
                    { value: 'TI', text: 'TARJETA DE IDENTIDAD' }
                  ];



  constructor(private fb: FormBuilder, private modalService: ConfirmModalService, private ReciboPagoUtils: ReciboPagoUtilsService, private UserService: UserService, private router: Router) {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      NumeroDocumento: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4)]],
      recaptcha: [ null, Validators.required]
    });
  }

  ngOnInit() {
    this.messages = {
      validateErrors: jsonStrings.messages.validateErrors
    };
  }

  openModal(){

    let options = [{
        name: "CANCELAR",
        value: false,
        styleClass: "btn-middle",
        event: ''
      },
      {
        name: "CONTINUAR",
        value: true,
        styleClass: "btn-high",
        event: ()=>{window.open('https://www.fna.gov.co:8081/CTSProxy/services/cobis/ibweb/ib-container/index.html#/login');}
      }
    ];

    this.modalService.openDialogCustom(
      'Estas saliendo de GOV.CO',
      'Con esta acción abrirás una nueva pestaña. ¡Te esperamos pronto!',
      options,
      'warning'
    );

  }

  checkShowPassword() {
    this.typeButton = this.typeButton === 'password' ? 'input' : 'password';
  }

  login()
  {

    // Error validación del formulario
    if (!this.form.valid) {
      this.invalidForm = true;
      this.messages.failureRequest = jsonStrings.messages.validateErrors;
      return;
    }

    // --Datos para enviar
    this.loginModel = {
      User: this.form.value.tipoDocumento.value+this.form.value.NumeroDocumento,
      Password: this.form.value.password
    };

    console.log('Login request');

    // Obtiene la información básica del cliente
    this.ReciboPagoUtils.login(this.loginModel).subscribe(

      // Success response
       response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.success === false) {
          this.failureRequest = true;
          
          //Contador de intentos de login fallidos
          this.loginFailedAttempts = this.loginFailedAttempts+1;

          console.log('Intentos fallidos: '+this.loginFailedAttempts);

          // Si es menor de 3 intentos
          if (this.loginFailedAttempts < 2){
            this.messages.failureRequest = jsonStrings.messages.loginFailed;
          }
          // 3 intentos o más
          else
          {
            this.messages.failureRequest = jsonStrings.messages.loginFailedAttempts; 
          }
          
          this.invalidForm = true;
          window.scroll(0, 0);
          return;
        }
           
        //Hace login exitosamente
        this.loginFailedAttempts = 0;
        // Asigna el tipo de documento
        this.responseModel.result.tipoDocumento = this.form.value.tipoDocumento.value;
        // Almacena la informacion del usuario localmente
        this.UserService.setUserLoggedIn(this.responseModel.result);
        this.router.navigate(['servicios-y-tramites/fna/consulta-linea-impresion-recibo-pago-credito/T6292/consulta-recibo']);
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
        window.scroll(0, 0);
        return;
      }
    );

  }

}
