import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsonStrings from '@stringResources/tramites/certificado-afiliacion.json';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { CertificadoAfiliacionUtilsService } from '../../services/certificado-afiliacion-utils.service';
import { ThrowStmt } from '@angular/compiler';
import { DatosSolicitanteModel } from '../../models/datosSolicitanteModel';
import appJson from '@stringResources/app-strings.json';


@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.scss']
})
export class DescargarComponent implements OnInit {

  invalidForm = false;
  failureRequest = false;
  mensajeDescarga = false;
  mensajeEnvioCorreo = false;
  tipoBusquedaForm: FormGroup;
  descargaForm: FormGroup;
  emailForm: FormGroup;
  recaptchaForm: FormGroup;
  messages: any;
  tiposDocumento: SelectListItemModel[];
  typeInput = 'text';
  datosSolicitante: DatosSolicitanteModel;
  disabled = '';

  constructor(private fb: FormBuilder, private certificadoAfiliacionUtils: CertificadoAfiliacionUtilsService) {
    this.tipoBusquedaForm = this.fb.group({
      tipoConsulta: ['']
    });
    this.descargaForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.compose([Validators.required, Validators.pattern(appJson.regexp.numeric)])],
    });
    this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(appJson.regexp.email)])]
    });
    this.recaptchaForm = this.fb.group({
      recaptcha: ['', Validators.required]
    });
    this.getParams();
  }

  ngOnInit() {
    this.messages = {
      searchEmpty: jsonStrings.messages.searchEmpty
    };
  }

  getParams() {
    this.tiposDocumento = this.certificadoAfiliacionUtils.getTiposDocumento();
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
    if (step == '2') {
      this.mensajeDescarga = false;
      this.mensajeEnvioCorreo = false;
    }
  }

  consultar() {
    this.disabled = 'true';
    // Error validación del formulario
    if (this.tipoBusquedaForm.value.tipoConsulta == 'EMAIL') {
      if (!this.emailForm.valid || !this.descargaForm.valid || !this.recaptchaForm.valid) {
        this.invalidForm = true;
        this.disabled = '';
        return;
      }
      // --Datos para enviar
      this.datosSolicitante = {
        tipoDocumento: this.descargaForm.value.tipoDocumento.value,
        documento: this.descargaForm.value.documento,
        email: this.emailForm.value.email
      };
      window.scroll(0, 0);
      this.certificadoAfiliacionUtils.enviar(this.datosSolicitante)
        .subscribe(
          (data) => {
            this.mensajeEnvioCorreo = true;
            this.mensajeDescarga = false;
            this.failureRequest = false;
            this.descargaForm.reset();
            this.emailForm.reset();
            this.recaptchaForm.reset();
            this.disabled = '';
          },
          (error) => {
              this.failureRequest = true;
              this.mensajeDescarga = false;
              this.mensajeEnvioCorreo = false;
              this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
              this.disabled = '';
          }
        );

        this.setStep('4');
        return;
    }

    if (!this.descargaForm.valid  || !this.recaptchaForm.valid)   {
      this.invalidForm = true;
      this.disabled = '';
      return;
    }
    // Success validación del formulario
    // --Datos para enviar
    this.datosSolicitante = {
      tipoDocumento: this.descargaForm.value.tipoDocumento.value,
      documento: this.descargaForm.value.documento,
      email: null
    };

    // Petición POST
    this.certificadoAfiliacionUtils.descargar(this.datosSolicitante)
        .subscribe(
          (data) => {
            this.mensajeEnvioCorreo = false;
            this.mensajeDescarga = true;
            this.failureRequest = false;
            window.scroll(0, 0);

            const newBlob = new Blob([data], {type: 'application/pdf'});
            // IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob && this.isIE()) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              this.descargaForm.reset();
              this.emailForm.reset();
              this.recaptchaForm.reset();
              this.disabled = '';
              return;
            }
            // Otros navegadores
            const downloadURL = window.URL.createObjectURL(newBlob);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.datosSolicitante.tipoDocumento + '' + this.datosSolicitante.documento + '.pdf';
            link.click();

            this.descargaForm.reset();
            this.emailForm.reset();
            this.recaptchaForm.reset();
            this.disabled = '';
            return;
          },
          (error) => {
              this.failureRequest = true;
              this.mensajeDescarga = false;
              this.mensajeEnvioCorreo = false;
              this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
              window.scroll(0, 0);
              this.disabled = '';
              return;
          }
        );

        this.setStep('4');
  }

  changeTipoDocumento() {
    this.setStep('2');
    this.descargaForm.get('documento').setValue('');
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

}
