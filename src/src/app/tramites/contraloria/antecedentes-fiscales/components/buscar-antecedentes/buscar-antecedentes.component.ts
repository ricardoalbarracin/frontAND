import { Component, OnInit } from '@angular/core';
import { BuscarAntecedentesForm } from './buscar-antecedentes-form';
import { FormGroup } from '@angular/forms';
import { AntecedentesFiscalesService } from '../../services/antecedentes-fiscales.service';
import { TipoDocumento } from '../../models/antecedentes-fiscales'
import  jsonStrings  from '@stringResources/tramites/antecedentes-fiscales.json';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

@Component({
  selector: 'app-buscar-antecedentes',
  templateUrl: './buscar-antecedentes.component.html',
  styleUrls: ['./buscar-antecedentes.component.scss']
})
export class BuscarAntecedentesComponent implements OnInit {

  formItem: BuscarAntecedentesForm;
  form: FormGroup;
  invalidForm: boolean = false;
  requestFailure: boolean = false;
  requestSuccess: boolean = false;
  showNotification: boolean = false;
  tiposDocumento: TipoDocumento[];
  messages: any;
  notificationMessages: any;

  constructor(private service: AntecedentesFiscalesService, private recaptchaService: RecaptchaService) {
    this.messages = {
      errorTitle: jsonStrings.messages["error-title"],
      errorForm: jsonStrings.messages["error-form"],
      errorRequest: jsonStrings.messages["error-request"],
      success: jsonStrings.messages.success
    };

    this.notificationMessages = {
      title: "",
      type: "",
      message: ""
    }
  }

  ngOnInit() {
    this.formItem = new BuscarAntecedentesForm();
    this.form = this.formItem.getForm();
  }

  ngAfterViewInit() {
    this.getDataForm();
  }

  getDataForm() {
    this.service.getTiposDocumento()
    .subscribe((data: any[]) => {
        if (data.length > 0){
          this.tiposDocumento = data;
        }
      }, (error) => {
        console.error(error);
      }
    );
  }

  search() {
    this.setTramiteStep("2"); 
    
    this.showNotification = false;
    if(!this.formItem.isValid()){
      this.showMessage("error", this.messages.errorForm);
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    let formValues = this.formItem.getFormValues();

    this.recaptchaService.validateServerKey(formValues.recaptcha).subscribe(
      (data) => {
        if (data["success"] === true){
          this.queryCertificados(formValues.documento, formValues.tipoDocumento.value);
        }else {
          //TODO: mostrar mensaje
          this.requestFailure = true;
        }
      },
      (error) => {
        this.requestFailure = true;
      }
    );
  }

  //Consulta el certificado con la información diligenciada
  queryCertificados(documento: string, tipoDocumento: string) {
    this.service.GetCertificado({
      documento: documento,
      tipoDocumento: tipoDocumento
    }).subscribe(
      (data) => { // Success
          this.showMessage("success", this.messages.success);
          this.handleFileView(data, documento);
          this.setTramiteStep("4"); 
          this.form.get('recaptcha').setValue(null);                 
      },
      (error) => {
        this.showMessage("error", this.messages.errorRequest);
        this.form.get('recaptcha').setValue(null);       
      }
    );
  }

  //Muestra el archivo de acuerdo al tipo de navegador (descarga el archivo cuando es IE)
  handleFileView(data: any, documento: string ): void {
    let blob = new Blob([data], { type: 'application/pdf'});

    if (window.navigator && window.navigator.msSaveOrOpenBlob && this.isIE()) {
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }
    // Otros navegadores
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = documento + '.pdf';
    link.click();
    return;
  }

  isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

  //hace el cambio del paso del trámite seleccionado
  private setTramiteStep(step: string): void {
    const areaServicio = document.getElementsByTagName('govco-area-servicios');

    if(areaServicio != undefined && areaServicio.length > 0 ){
      areaServicio[0].setAttribute('steptramites', step);
    }
  }

  private showMessage(type: string, message: string): void {
    this.notificationMessages.type = "";
    this.notificationMessages.title = "";
    this.notificationMessages.message = "";

    switch (type) {
      case "error": 
        this.notificationMessages.title = this.messages.errorTitle;
        this.notificationMessages.message = message;
        this.notificationMessages.type = "error";
        break;
      case "success": 
        this.notificationMessages.title = message;
        this.notificationMessages.type = "success";
        break;
    }    
    this.showNotification = true;
    window.scroll(0, 0);
  }
}
