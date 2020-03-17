import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SenaUtilsService } from '../../services/sena-utils.service';
import { BusquedaSenaForm } from './busqueda-sena-form';
import { Router } from '@angular/router';
import { DatosSolicitante } from '../../models/datosSolicitante';
import { CertificadoConstancia } from '../../models/certificadoConstancia';
import jsonStrings from '@stringResources/tramites/certificados-constancias.json';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import appJson from '@stringResources/app-strings.json';

@Component({
  selector: 'app-certificado-constancia',
  templateUrl: './certificado-constancia.component.html',
  styleUrls: ['./certificado-constancia.component.scss']
})
export class CertificadoConstanciaComponent implements OnInit {
  tipoConsultaForm: FormGroup;
  documentoForm: FormGroup;
  registroForm: FormGroup;
  recaptchaForm: FormGroup;
  messages: any;
  invalidForm = false;
  requestFailure = false;
  paramsList: any;
  tiposDocumento: SelectListItemModel[];
  datosSolicitante: DatosSolicitante;
  certificadosConstancias: CertificadoConstancia[];

  constructor(private senaUtils: SenaUtilsService, private router: Router, private fb: FormBuilder) {
    this.getParams();

    this.tipoConsultaForm = this.fb.group({
      tipoConsulta: ['']
    });
    this.documentoForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.compose([Validators.required, Validators.pattern(appJson.regexp.numeric)])],
    });
    this.registroForm = this.fb.group({
      registro: ['', Validators.required]
    });
    this.recaptchaForm = this.fb.group({
      recaptcha: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.certificadosConstancias = [];
    this.messages = {
      advice: jsonStrings.messages.advice,
      registry: jsonStrings.messages.registry,
      searchEmpty: jsonStrings.messages.searchEmpty
    };
  }

  getParams() {
    this.tiposDocumento = this.senaUtils.getTiposDocumento();
  }

  consultar() {

    if ((!this.registroForm.valid || !this.recaptchaForm.valid) && this.tipoConsultaForm.value.tipoConsulta == 'REG')   {
      this.invalidForm = true;
      return;
    }

    if ((!this.documentoForm.valid || !this.recaptchaForm.valid) && this.tipoConsultaForm.value.tipoConsulta != 'REG') {
      this.invalidForm = true;
      window.scroll(0, 0);
      return;
    }

    this.datosSolicitante = {
      tipoDocumento: this.documentoForm.value.tipoDocumento.value,
      documento: this.documentoForm.value.documento,
      registro: this.registroForm.value.registro
    };

    console.log(this.datosSolicitante);
    this.senaUtils.consultarCertificadosCosntancias(this.datosSolicitante).subscribe(
      // Success response
      response => {
        if (response !== undefined && response.length > 0) {
          this.senaUtils.setDatosSolicitante(this.datosSolicitante);
          this.certificadosConstancias = response;
          this.senaUtils.setListCertificadosConstancias(this.certificadosConstancias);
          // Salida
          this.setStep("3")
          this.router.navigate(['servicios-y-tramites/SENA/certificados-y-constancias-academicas/T1033/list']);
        }
      },
      // Failure response
      error => {
        this.invalidForm = true;
        this.requestFailure = true;
        window.scroll(0, 0);
        return;
      },
    );
  }
  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }
}
