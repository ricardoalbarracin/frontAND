import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';

@Component({
  selector: 'app-login-minjusticia-modal',
  templateUrl: './login-minjusticia-modal.component.html',
  styleUrls: ['./login-minjusticia-modal.component.scss']
})
export class LoginMinjusticiaModalComponent implements OnInit {  

  @Output() successLoginEvent: EventEmitter<boolean> = new EventEmitter();

  loginForm: FormGroup; 
  typeButton: string = "password";
  showPassword: boolean = true;

  public noticeMessage: string;  
  public pageTitle: string;
  public errorMessages: any ;  
  public invalidForm: boolean = false;
  public mainErrorMessage: string;
  public tramiteUrl: string;

  constructor( private fb: FormBuilder, 
      private activeModal: NgbActiveModal,
      private router: Router,
      private tramiteService: MinjusticiaUtilsService,
      private authService: AgendamientoAuthenticationService  ) {   
        this.loadMessages();
        this.tramiteUrl = this.tramiteService.getTramiteUrl();
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
      this.successLoginEvent.emit(true);
      this.activeModal.close();
    }else {
      this.invalidForm = true;
      this.mainErrorMessage = this.errorMessages.errorForm;
    }
  }

  checkShowPassword() {
    this.typeButton = this.typeButton == "password" ? "input": "password";
  }

  forgotPassword() {
    this.router.navigate([this.tramiteUrl +"/recuperarContrasena"]);
    this.activeModal.close();
  }

  signIn() {
    this.router.navigate([this.tramiteUrl +"/registro"]);
  }
}
