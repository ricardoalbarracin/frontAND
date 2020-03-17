import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistroMinjusticiaForm }  from './registro-minjusticia-form'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroMinjusticiaTerminosComponent } from '../registro-minjusticia-terminos/registro-minjusticia-terminos.component';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';
import { dialogModal } from '@shared/dialog-modal/models/dialogModal';

@Component({
  selector: 'app-registro-minjusticia',
  templateUrl: './registro-minjusticia.component.html',
  styleUrls: ['./registro-minjusticia.component.scss']
})
export class RegistroMinjusticiaComponent implements OnInit {

  registroMinjusticiaForm: RegistroMinjusticiaForm;
  signInForm: FormGroup; 
  invalidForm: boolean = false;
  messages: any;
  divipola: any[];
  paramsList : any = {
    tipoDocumento: [],
    departamento: [],
    municipio: [],
    estrato: [],
    ingresos: []
  };
  
  currentMessage: any = {
    type: "",
    title: "",
    message: ""
  }
  
  showPasswordBool: any = {
    showpassword: "password",
    repeatPassword: "password"
  };

  constructor(
      private modalService: NgbModal, 
      private router: Router,
      private tramiteService: MinjusticiaUtilsService,
      private authService: AgendamientoAuthenticationService,
      private service: MinjusticiaUtilsService,
      private recaptchaService: RecaptchaService,
      private confirmModal: ConfirmModalService) { 
    this.getMessages();
  }

  getMessages(): void {
    this.messages = {
      errorFormTitle: jsonStrings.messages["title-error"],
      errorForm : jsonStrings.messages["form-error"],
      prerequisitosTitle: jsonStrings.messages.registro["prerequisitos-title"],
      prerequisitos: jsonStrings.messages.registro.prerequisitos
    }
  }

  ngOnInit() {
    this.getParams();
    this.registroMinjusticiaForm = new RegistroMinjusticiaForm();
    this.buildForm();
  }

  buildForm() {
    this.signInForm = this.registroMinjusticiaForm.getForm();
    this.changeTipoPasaporte();
  }

  getParams() {
    this.getDivipola();
    this.getTiposDocumento();
    this.getEstratos();
    this.getIngresos();
  }

  //Evento de modificació del valor del departamento
  changeTipoPasaporte() {
    this.signInForm.get('departamento').valueChanges.subscribe(
      (departamentoSeleccionado) => {
          if (departamentoSeleccionado != undefined && departamentoSeleccionado != ""){
            this.paramsList.municipio = [];
            this.signInForm.get("municipio").setValue('');
            this.loadMunicipiosByDepartamento(departamentoSeleccionado.value);
          }
      }
    );
  }

  //Obtiene el listado de municipios con su respectivos municipios asociados
  getDivipola(): void {
    this.tramiteService.getDivipola().subscribe(
      (data) => { 
        if(data["success"] === true){
          this.divipola = data["result"];
          this.paramsList.departamento = this.getDepartamentosFromDivipola(this.divipola);
        }
      }
    );
  }

  //Obtiene los tipo de documento dispuestos para el trámite
  getTiposDocumento(): void {
    this.tramiteService.getTiposDocumento().subscribe(
      (data) => {
        if(data["success"] === true){
          this.paramsList.tipoDocumento = data["result"];
        }
      }
    );
  }

  //Obtiene los estratos disponibles para el trámite
  getEstratos(): void {
    this.tramiteService.getEstratos().subscribe(
      (data) => {
        if(data["success"] === true){
          this.paramsList.estrato = data["result"];
        }
      }
    );
  }

  //Obtiene el listado de ingresos para el trámite
  getIngresos(): void {
    this.tramiteService.getIngresos().subscribe(
      (data) => {
        if(data["success"] === true){
          this.paramsList.ingresos = data["result"];
        }
      }
    );
  }

  //Retorna listado de elementos con unicamente la información de los departamentos
  getDepartamentosFromDivipola(divipolaList): any[] {
    if (divipolaList != undefined && divipolaList.length > 0){
      return divipolaList.map((item) => {
        return {
          value: item.id,
          text: item.DepartamentoNombre
        }
      });
    }
    return [];
  }

  //Carga los municipios de acuerdo al elemento seleccionado
  loadMunicipiosByDepartamento(idDepartamento: string): void {
    if (this.divipola != undefined &&  this.divipola.length > 0 ) {
      var departamentoSeleccionado = this.divipola.find((item) => {
        return item.id == idDepartamento;
      });
      
      if (departamentoSeleccionado != undefined 
          && departamentoSeleccionado.municipios != undefined 
          && departamentoSeleccionado.municipios.length > 0) {

        this.paramsList.municipio = departamentoSeleccionado
          .municipios.map(item => {
            return {
              value: item.id,
              text: item.MunicipioNombre
            }
        });
      }      
    }
  }

  showTerms() {
    this.modalService.open(RegistroMinjusticiaTerminosComponent, { size: 'lg', 
      backdrop: "static",
      keyboard: false
    });
  }

  //Realiza la validación de formulario, recaptcha y envía a guardar
  save() {    
    this.invalidForm = false;
    if (!this.registroMinjusticiaForm.isValid()){
      this.showMessage(this.messages.errorFormTitle, this.messages.errorForm, "error");
      this.invalidForm = true;
      return;
    }

    let formValues = this.registroMinjusticiaForm.getFormValues();
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

  //Envía la información a guardar
  sendData(formValues: any) {
    const values = this.prepareUserModel(formValues);

    this.authService.saveUser(values).subscribe(
      (data) => {
        this.signInForm.get('recaptcha').setValue(null);   
        if (data["success"] === true){
          this.showSuccess();
        }else {
          const message = data["message"] != "" ? data["message"]: this.messages.errorForm;

          this.invalidForm = true;          
          this.showMessage(this.messages.errorFormTitle, message, "error");
          return;
        }
      },
      (error) => {
        this.signInForm.get('recaptcha').setValue(null);   
        this.invalidForm = true;
        this.showMessage(this.messages.errorFormTitle, this.messages.errorMessage, "error");        
        return;
      }
    );
  }

  //Muestra el mensaje de eéxito al finalizar el registro de usuario
  private showSuccess() {
    this.confirmModal.openNotificationDialog(
      jsonStrings.messages.registro["success-title"], 
      jsonStrings.messages.registro["success-message"], 
      "success", 
      this.handleSuccess
    );
  }

  reset(): void {
    let options: dialogModal[] = [
      {
        name: jsonStrings.messages.registro["reset-option-success"],
        value: false,
        styleClass: "btn-middle",
        event: () => {}
      },{
        name: jsonStrings.messages.registro["reset-option"],
        value: true,
        styleClass: "btn-high",
        event: this.resetValues
      }
    ]

    this.confirmModal.openDialogCustom(
      jsonStrings.messages.registro["reset-title"], 
      jsonStrings.messages.registro["reset-message"], 
      options,
      "error", 
      false
    );
  }

  resetValues = () => {
    this.service.resetQueryParams();
    this.router.navigate([this.service.getTramiteUrl()]);
  }

  handleSuccess = () =>  {
    const consultorio = this.service.getConsultorioSelected();
    if (consultorio == undefined){
      this.resetValues();
    }else {
      this.router.navigate([this.service.getTramiteUrl() + "/agendarcita"]);
    }

    return;
  }

  //Prepara el modelo para que tenga el formato solicitado por el backend
  private prepareUserModel(formValues: any) {
    return { 
      DatosUsuario: {
        UsuarioPrimerNombre: formValues.primerNombre,
        UsuarioSegundoNombre: formValues.segundoNombre,
        UsuarioPrimerApellido: formValues.primerApellido,
        UsuarioSegundoApellido: formValues.segundoApellido,
        UsuarioTelefono: formValues.telefono,
        UsuarioEmail: formValues.email,
        UsuarioIdentificacion: formValues.numeroDocumento,
        Contrasena: formValues.contrasena,
      },
      DatosCiudadano: {
        CiudadanoDireccion: formValues.direccion,
        CiudadanoDocumentoIdentidad: formValues.numeroDocumento,
        EstratoId: formValues.estrato.value,
        MunicipioId: formValues.municipio.value,
        TipoDocumentoId: formValues.tipoDocumento.value,
        TipoIngresosId: formValues.ingresos.value
      }
    };
  }

  //Muestra el campo de contraseña al seleccionar el checkbox correspondiente 
  showPassword(type: string){
    if (type == "password"){
      this.showPasswordBool.showpassword = this.showPasswordBool.showpassword === 'password' ? 'text' : 'password';
    }else {
      this.showPasswordBool.repeatPassword = this.showPasswordBool.repeatPassword === 'password' ? 'text' : 'password';
    }
  }

  //Muestra los mensajes de notificación
  private showMessage(title: string, message: string, type: string) {
    this.currentMessage.type = type;
    this.currentMessage.title = title;
    this.currentMessage.message = message;
    window.scroll(0, 0);
  }
}
