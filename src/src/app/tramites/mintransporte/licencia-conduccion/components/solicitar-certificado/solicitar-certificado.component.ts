import { Component, OnInit } from '@angular/core';
import { SolicitarCertificadoForm } from './solicitar-certificado-form'
import { FormGroup } from '@angular/forms';
import  jsonString  from '@stringResources/tramites/mintransporte-solicitar-certificado.json'
import generalJson from '@stringResources/app-strings.json'
import { dialogModal } from '@shared/dialog-modal/models/dialogModal';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { LicenciaConduccionService } from '../../services/licencia-conduccion.service';
import { NotificationMessageModel } from '../../models/notificacionMessageModel';
import { SolicitudListModel } from '../../models/solicitudListModel';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { SolicitudCertificadoModel } from '../../models/SolicitudCertificadoModel';

@Component({
  selector: 'app-solicitar-certificado',
  templateUrl: './solicitar-certificado.component.html',
  styleUrls: ['./solicitar-certificado.component.scss']
})
export class SolicitarCertificadoComponent implements OnInit {

  solicitudForm: FormGroup;
  solicitarCertificadoForm: SolicitarCertificadoForm;
  paisReadOnly: boolean = false;
  invalidForm: boolean;
  successForm: boolean;
  messages: any;
  currentMessage: NotificationMessageModel;
  list: SolicitudListModel;
  paisSelected: string;
  acceptTerms: boolean = false;

  constructor(private dialog: ConfirmModalService, 
      private mintrabajoService: LicenciaConduccionService,
      private recaptchaService: RecaptchaService) {
    this.getMessages();

    this.currentMessage = {
      title: "",
      message: "",
      type: ""
    };

    this.list = {
      entidades: [],
      paises: [],
      tiposDocumento: []
    }
  }
  
  //Carga inicial
  ngOnInit() {
    this.solicitarCertificadoForm = new SolicitarCertificadoForm();
    this.buildForm();
    this.getEntidades();
    this.getPaises();
    this.getTiposDocumento();
    this.changeEntidad();
  }

  //Obtiene los mensajes y titulos que serán usados por la vista
  getMessages() {
    this.messages = {
      titleError: jsonString.messages["title-error"],
      errorMessage: jsonString.messages["form-error"],
      formSuccess: jsonString.messages["form-success"],
      termError: jsonString.messages["term-error"],
      recatpchaError: jsonString.messages["recaptcha-error"],
      titleDatosPersonales: jsonString.messages.form["title-datos-personales"],
      titleDatosDestino: jsonString.messages.form["title-datos-destino"],
      titleAutorizacion: jsonString.messages.form["title-autorizacion"],
      privacidadUrl: jsonString.messages["privacidad-url"]      
    }
  }

  //Obtiene la información de las entidades disponibles
  getEntidades() {
    this.mintrabajoService.getEntidades().subscribe((data: any) => { 
      if ( data != undefined && data.success === true){
        this.list.entidades = data.result;
      }else {
        //TODO: controlar errores internos
      }
    }, (error) => {
      console.error(error);
    });
  }

  //obtiene el listado de paises disponibles
  getPaises() {
    this.mintrabajoService.getPaises().subscribe((data: any) => { 
      if (data != undefined && data.success === true){
        this.list.paises = data.result;
      }else {
        //TODO: controlar errores internos
      }
    }, (error) => {
      console.error(error);
    });
  }

  //Obtiene los tipso de documentos permitidos
  getTiposDocumento() {
    this.mintrabajoService.getTiposDocumento().subscribe((data: any) => { 
      if (data != undefined && data.success === true){
        this.list.tiposDocumento = data.result;
      }else {
        //TODO: controlar errores internos
      }
    }, (error) => {
      console.error(error);
    });
  }

  //Obtiene la información del formulario
  buildForm() {
    this.solicitudForm = this.solicitarCertificadoForm.getForm();
  }

  changeEntidad() {
    this.solicitudForm.get('tipoEntidadDestino').valueChanges.subscribe(
      (tipoEntidad) => {
        if(tipoEntidad != undefined ){
          this.paisSelected = '';
          if (tipoEntidad.text.toString().toUpperCase().includes("AUTORIDAD DE CONTROL")){          
              this.paisSelected = 'CO';
              this.paisReadOnly = true;  
              return;
          }
        }
        this.paisReadOnly = false; 
      });
  }

  //Inicia el proceso de reiniciar el formulario
  resetForm() { 
    let options: dialogModal[] = [
      {
        name: generalJson.messages["reset-form-modal"]["btn-cancel"],
        value: false,
        styleClass: "btn-middle",
        event: () => { }
      },{
        name: generalJson.messages["reset-form-modal"]["btn-clean"],
        value: true,
        styleClass: "btn-high",
        event: this.cleanForm
      }
    ]

    this.dialog.openDialogCustom(
      generalJson.messages["reset-form-modal"].title,
      generalJson.messages["reset-form-modal"].body,
      options,
      "error",
      false,
      "lg"
    );
  }

  //Limpia los datos del formulario y los mensajes de notificación
  cleanForm = () => {
    this.setTramiteStep("2");
    this.invalidForm = false;
    this.successForm = false;
    this.paisSelected = '';
    this.solicitarCertificadoForm.resetForm();
  }

  //Método que es llamado cuando el usuario realiza la acción de solicitar el certificado
  solicitar() {
    this.setTramiteStep("2");
    this.invalidForm = this.successForm = false;
    if (!this.solicitarCertificadoForm.isValid()){
      this.invalidForm = true;
      this.showMessage(this.messages.titleError, this.messages.errorMessage, "error");
      return;
    }

    if (!this.acceptTerms){
      this.invalidForm = true;
      this.showMessage(this.messages.titleError, this.messages.termError, "error");
      return;
    }
    
    let formValues = this.solicitarCertificadoForm.getFormValues();
    this.recaptchaService.validateServerKey(formValues.recaptcha).subscribe(
      (data) => {
        if (data["success"] === true){
          this.sendData(formValues);
        }else {
          this.showMessage(this.messages.titleError, this.messages.recatpchaError, "error");          
          return;
        }
      },
      (error) => {
        this.showMessage(this.messages.titleError, this.messages.recatpchaError, "error");
        return;
      }
    );
    return;
  }

  //Envía la solicitud
  sendData(formData: any) {
    const data: SolicitudCertificadoModel = {
      PrimerNombre: formData.primerNombre,
      SegundoNombre: formData.segundoNombre,
      PrimerApellido: formData.primerApellido,
      SegundoApellido: formData.segundoApellido,
      TipoDocumento: formData.tipoDocumento.value,
      NumIdentificacion: formData.numeroIdentificacion,
      CorreoElectronico: formData.correoElectronico,
      TipoEntidad: formData.tipoEntidadDestino.value,
      Pais: formData.paisDestino.value
    }

    this.mintrabajoService.postSolicitud(data).subscribe(
      (data) => {
        this.solicitudForm.get('recaptcha').setValue(null);   
        if (data["success"] === true){
          this.successForm = true;
          this.setTramiteStep("4");
          this.showMessage(this.messages.formSuccess, "", "success");
        }else {
          this.invalidForm = true;
          this.showMessage(this.messages.titleError, this.messages.errorMessage, "error");
          return;
        }
      },
      (error) => {
        this.solicitudForm.get('recaptcha').setValue(null);   
        this.invalidForm = true;
        this.showMessage(this.messages.titleError, this.messages.errorMessage, "error");
        
        return;
      }
    );
  }

  aceptarTerminos(): void {
    this.acceptTerms = this.acceptTerms === true ? false : true;
    return;
  }

  //Muestra los mensajes de notificación
  private showMessage(title: string, message: string, type: string) {
    this.currentMessage.type = type;
    this.currentMessage.title = title;
    this.currentMessage.message = message;
    window.scroll(0, 0);
  }

  showTerms() { 
    window.open(this.messages.privacidadUrl, "_blank");
  }

  private setTramiteStep(step: string): void {
    const areaServicio = document.getElementsByTagName('govco-area-servicios');

    if(areaServicio != undefined && areaServicio.length > 0 ){
      areaServicio[0].setAttribute('steptramites', step);
    }
  }
}
