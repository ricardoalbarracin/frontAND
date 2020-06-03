import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import jsonStrings from '@stringResources/tramites/aportes-parafiscales.json';
import { LoginModel } from '../../models/loginModel';
import { AportesParafiscalesUtilsService } from '../../services/aportes-parafiscales-utils.service';
import { ResponseModel } from '../../models/responseModel';
import { ConsultaIcbfComponent } from '../consulta-icbf/consulta-icbf.component';

@Component({
  selector: 'app-login-icbf',
  templateUrl: './login-icbf.component.html',
  styleUrls: ['./login-icbf.component.scss']
})
export class LoginIcbfComponent implements OnInit {

  form: FormGroup;
  typeButton = 'password';
  showPassword = true;
  invalidForm = false;
  failureRequest = false;
  messages: any;
  loginModel: LoginModel;
  responseModel: ResponseModel;

  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private aportesParafiscalesUtils: AportesParafiscalesUtilsService) {
    this.form = this.fb.group({
      user: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.messages = {
      searchEmpty: jsonStrings.messages.searchEmpty,
      help: jsonStrings.messages.help,
      failureRequest: ''
    };
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);

    if (step == '2') {
      const el = document.getElementById('messageConsulta');
      el.style.display = 'none';
    }
  }

  login() {

    // Error validación del formulario
    if (!this.form.valid) {
      this.invalidForm = true;
      return;
    }

    // Success validación del formulario
    // --Datos para enviar
    this.loginModel = {
      User: this.form.value.user,
      Password: this.form.value.password
    };

    // Petición POST
    this.aportesParafiscalesUtils.login(this.loginModel).subscribe(
      // Success response
      response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          this.messages.failureRequest = jsonStrings.messages.searchEmpty;
          window.scroll(0, 0);
          return;
        }
        // Salida
        this.failureRequest = false;
        const u: User = {username: this.form.value.user};
        this.userService.setUserLoggedIn(u);
        window.location.href = '/tramites-y-servicios/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760/generar-certificado';
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

  checkShowPassword() {
    this.typeButton = this.typeButton === 'password' ? 'text' : 'password';
  }

  forgotPassword() {
    this.router.navigate(['/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760/forgot-password']);
  }

  signIn() {
    this.router.navigate(['/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760/registro']);
  }

}
