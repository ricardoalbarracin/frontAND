import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsonStrings from '@stringResources/tramites/aportes-parafiscales.json';
import { DataCertificacionModel } from '../../models/dataCertificacionModel';
import { AportesParafiscalesUtilsService } from '../../services/aportes-parafiscales-utils.service';
import { ResponseModel } from '../../models/responseModel';

@Component({
  selector: 'app-consulta-icbf',
  templateUrl: './consulta-icbf.component.html',
  styleUrls: ['./consulta-icbf.component.scss']
})
export class ConsultaIcbfComponent implements OnInit {

  form: FormGroup;
  invalidForm = false;
  failureRequest = false;
  messages: any;
  dataCertificacionModel: DataCertificacionModel;
  responseModel: ResponseModel;
  mensajeDescarga = false;

  constructor(private fb: FormBuilder, private aportesParafiscalesUtils: AportesParafiscalesUtilsService) {
    this.form = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.messages = {
      searchEmpty: jsonStrings.messages.searchEmpty,
      failureRequest: jsonStrings.messages.failureRequest
    };
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);

    if (step == '2') {
      this.mensajeDescarga = false;
    }
  }

  showMessageDownload() {
    const el = document.getElementById('messageConsulta');
    el.style.display = 'block';
  }

  consultar() {
    // Error validación del formulario
    if (!this.form.valid) {
      this.invalidForm = true;
      return;
    }
    // Success validación del formulario
    // --Datos para enviar
    this.dataCertificacionModel = {
      identificacion: null,
      vigencia: null,
      codigoVerificacion: this.form.value.codigo
    };
    // Petición POST
    this.aportesParafiscalesUtils.verificar(this.dataCertificacionModel).subscribe(
      // Success response
      response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          return;
        }
        // Salida
        this.failureRequest = false;
        this.mensajeDescarga = true;
        this.showMessageDownload();
        this.setStep('3');
        this.aportesParafiscalesUtils.generar(this.dataCertificacionModel)
        .subscribe(
          (data) => {
            this.setStep('4');
            const newBlob = new Blob([data], {type: 'application/pdf'});
            // IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob && this.isIE()) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
            }
            // Otros navegadores
            const downloadURL = window.URL.createObjectURL(newBlob);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = this.dataCertificacionModel.codigoVerificacion + '.pdf';
            link.click();
          },
          (error) => {
              this.failureRequest = true;
              this.mensajeDescarga = false;
              this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
              return;
          }
        );
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.mensajeDescarga = false;
        this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
        return;
      },
    );
    this.invalidForm = false;
  }

  isIE() {
    const ua = navigator.userAgent;
    const isIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    return isIe;
  }

}
