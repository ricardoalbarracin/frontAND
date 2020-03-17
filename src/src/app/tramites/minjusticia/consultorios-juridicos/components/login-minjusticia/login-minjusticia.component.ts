import { Component, OnInit } from '@angular/core';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';

@Component({
  selector: 'app-login-minjusticia',
  templateUrl: './login-minjusticia.component.html',
  styleUrls: ['./login-minjusticia.component.scss']
})
export class LoginMinjusticiaComponent implements OnInit {
  loginForm: FormGroup; 
  typeButton: string = "password";
  showPassword: boolean = true;

  public noticeMessage: string;  
  public pageTitle: string;
  public errorMessages: any ;  
  public invalidForm: boolean = false;
  public mainErrorMessage: string;

  constructor( private fb: FormBuilder, 
      private router: Router,
      private authService: AgendamientoAuthenticationService ) { 
    this.loadMessages();
  }

  loadMessages(): void {
    this.pageTitle = jsonStrings.messages["login-modal"].title;
    this.noticeMessage = jsonStrings.messages["advice"];
    this.errorMessages = {
      errorFormTitle: jsonStrings.messages["title-error"],
      errorForm : jsonStrings.messages["form-error"],
      forgotPassword: jsonStrings.messages["login-modal"]["forgot-password"],
      forgotPasswordTitle : jsonStrings.messages["login-modal"]["login-button"],
      errorSubmit: jsonStrings.messages["login-modal"]["login-error"]
    };   
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }


  login(){
    if(!this.loginForm.valid){
      this.mainErrorMessage = this.errorMessages.errorForm;
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false; 

    this.authService.login(this.loginForm.value).subscribe(
      (data) => this.handleLogin(data),
      (error) => {
        this.mainErrorMessage = this.errorMessages.errorSubmit;
        this.invalidForm = true;
      }
    );
  }

  handleLogin(state: boolean): void {
    if(state === true){
      this.router.navigate(["/minjusticia/buscarAgenda"]);  
    }else {
      this.invalidForm = true;
      this.mainErrorMessage = this.errorMessages.errorForm;
    }
  }

  checkShowPassword() {
    this.typeButton = this.typeButton == "password" ? "input": "password";
  }

  forgotPassword() {
    this.router.navigate(["/minjusticia/recuperarContrasena"]);
  }

  signIn() {
    this.router.navigate(["/minjusticia/registro"]);
  }

}
