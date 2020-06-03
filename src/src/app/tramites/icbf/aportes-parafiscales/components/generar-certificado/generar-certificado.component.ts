import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AportesParafiscalesUtilsService } from '../../services/aportes-parafiscales-utils.service';
import jsonStrings from '@stringResources/tramites/aportes-parafiscales.json';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IdentificacionModel } from '../../models/identificacionModel';
import { DataCertificacionModel } from '../../models/dataCertificacionModel';
import { ResponseModel } from '../../models/responseModel';
import { InformativoModel } from '../../models/informativoModel';

@Component({
  selector: 'app-generar-certificado',
  templateUrl: './generar-certificado.component.html',
  styleUrls: ['./generar-certificado.component.scss']
})
export class GenerarCertificadoComponent implements OnInit {

  form: FormGroup;
  invalidForm = false;
  paramsList: any;
  failureRequest = false;
  messages: any;
  vigencias: any[];
  identificacionModel: IdentificacionModel;
  dataCertificacionModel: DataCertificacionModel;
  responseModel: ResponseModel;
  mensajeDescarga = false;
  informativoModel: InformativoModel;

  constructor(private fb: FormBuilder, private aportesParafiscalesUtils: AportesParafiscalesUtilsService,
              private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      vigencia: ['', Validators.required],
      autorizacionDatos: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.messages = {
      advice: jsonStrings.messages['generate-info'],
      adviceInfo: jsonStrings.messages['generate-info-copy'],
      searchEmpty: jsonStrings.messages.searchEmpty,
      failureRequest: ''
    };
    if (!this.userService.getUserLoggedIn()) {
      this.router.navigate(['/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760/']);
    }
    this.getInformativos();
    this.getVigencias();
  }

  getVigencias() {
    this.identificacionModel = {
     Identificacion: this.userService.getUserLoggedIn().username
   };
    this.aportesParafiscalesUtils.getVigencias(this.identificacionModel).subscribe(
     // Success response
     response => {
         this.vigencias = response;
         this.setStep('3');
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
   idInformativo: 2,
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
  if (step == '3') {
    this.mensajeDescarga = false;
  }
}

  generar() {
    this.mensajeDescarga = false;
    // Error validación del formulario
    if (!this.form.valid || this.form.value.autorizacionDatos == false) {
      this.invalidForm = true;
      return;
    }
    // Success validación del formulario
    // --Datos para enviar
    this.dataCertificacionModel = {
      identificacion: this.userService.getUserLoggedIn().username,
      vigencia: this.form.value.vigencia.text,
      codigoVerificacion: null
    };
    // Petición POST
    this.aportesParafiscalesUtils.verificar(this.dataCertificacionModel).subscribe(
      // Success response
      response => {
        this.responseModel = response;
        // Validación datos backend
        if (this.responseModel.error === 1) {
          this.failureRequest = true;
          this.messages.failureRequest = this.responseModel.mensaje;
          window.scroll(0, 0);
          return;
        }
        // Salida
        this.failureRequest = false;
        this.mensajeDescarga = true;
        this.setStep('4');
        window.scroll(0, 0);
        this.form.get('autorizacionDatos').setValue(null);
        this.aportesParafiscalesUtils.generar(this.dataCertificacionModel)
        .subscribe(
          (data) => {

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
            link.download = this.dataCertificacionModel.identificacion + '' + this.dataCertificacionModel.vigencia + '.pdf';
            link.click();

          },
          (error) => {
              this.failureRequest = true;
              this.mensajeDescarga = false;
              this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
              window.scroll(0, 0);
              return;
          }
        );
      },
      // Failure response
      error => {
        this.failureRequest = true;
        this.mensajeDescarga = false;
        this.messages.failureRequest = 'Se produjo un error al procesar la solicitud';
        window.scroll(0, 0);
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
