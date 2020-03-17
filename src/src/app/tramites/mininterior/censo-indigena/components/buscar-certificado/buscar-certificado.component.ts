import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CensoIndigenaService } from '../../services/censo-indigena.service';
import jsonStrings from '@stringResources/tramites/censo-indigena.json';
import { BuscarCertificadoForm } from './buscar-certificado-form';
import { GenerarCertificado } from '../../models/generar-certificado';
import { ValidarCertificadoForm } from './buscar-certificado-validar-form';
import { ValidarCertificado } from '../../models/validar-certificado';

@Component({
  selector: 'app-buscar-certificado',
  templateUrl: './buscar-certificado.component.html',
  styleUrls: ['./buscar-certificado.component.scss']
})
export class BuscarCertificadoComponent implements OnInit {

  buscarCertificadoForm: BuscarCertificadoForm;
  generarCensoForm: FormGroup;
  validarCertificadoForm: ValidarCertificadoForm;
  validarCensoForm: FormGroup;

  public noticeMessage: string;
  tiposDocumentos: any;
  dataGenerar: GenerarCertificado;
  dataValidar: ValidarCertificado;
  flag: string;

  mostrarAlerta: boolean = false;
  tipoAlerta: string;
  mensajeAlerta: string;
  titulo: string;
  invalidForm: boolean = false;

  constructor(public censoIndigenaService: CensoIndigenaService) {
    this.getParams();
    this.buscarCertificadoForm = new BuscarCertificadoForm();
    this.validarCertificadoForm = new ValidarCertificadoForm();
    this.buildForm();
    this.tiposDocumentos = [];
    this.flag = 'generar';
    this.dataGenerar = new GenerarCertificado();
    this.dataValidar = new ValidarCertificado();
  }

  ngOnInit() {
    this.noticeMessage = jsonStrings.messages["advice"];
  }

  buildForm() {
    this.generarCensoForm = this.buscarCertificadoForm.getForm();
    this.validarCensoForm = this.validarCertificadoForm.getForm();
  }

  getParams() {
    this.censoIndigenaService.getTiposDocumentos()
      .subscribe(
        (data) => {
          this.tiposDocumentos = data;
        },
        (error) => {
          this.tiposDocumentos = [];
        }
      );
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  onItemChange(valor) {
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.flag = valor;
    this.invalidForm = false;
    this.titulo = '';
    this.buscarCertificadoForm = new BuscarCertificadoForm();
    this.validarCertificadoForm = new ValidarCertificadoForm();
    this.buildForm();
    this.setStep('2');
  }

  get generarErrores() { return this.buscarCertificadoForm.getForm().controls; }
  get validarErrores() { return this.validarCertificadoForm.getForm().controls; }

  limpiar() {
    this.mostrarAlerta = false;
    this.setStep('2');
  }

  actualizarDocumento() {
    this.mostrarAlerta = false;
    this.setStep('2');
    this.generarCensoForm.get('numeroDocumento').setValue(null);
  }

  generar() {
    this.invalidForm = false;
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.titulo = '';
    this.setStep('2');
    if (!this.buscarCertificadoForm.isValid()) {
      this.invalidForm = true;
      this.mostrarAlerta = true;
      this.tipoAlerta = 'error';
      this.titulo = 'Lo sentimos';
      this.mensajeAlerta = jsonStrings.messages["camposObligatorios"];
      this.setStep('2');
    } else {
      this.mostrarAlerta = false;
      this.dataGenerar.Codigo = this.buscarCertificadoForm.getFormValues().tipoDocumento.value;
      this.dataGenerar.Documento = this.buscarCertificadoForm.getFormValues().numeroDocumento;
      this.censoIndigenaService.postGenerarCertificado(this.dataGenerar)
        .subscribe(
          (data) => {
            this.mostrarAlerta = true;
            this.tipoAlerta = 'success';
            this.titulo = jsonStrings.messages["200generarCertificado"];
            this.mensajeAlerta = '';
            let blob = new Blob([data], { type: 'application/pdf' });
            let url = window.URL.createObjectURL(blob);

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, "certificado.pdf");
              this.setStep('4');
            } else {
              let pwa = window.open(url);
              if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
                alert(jsonStrings.messages["habilitarPopUpNavegador"]);
              }
              this.setStep('4');
            }
          },
          (error) => {
            if (error.status == 404) {
              this.mostrarAlerta = true;
              this.tipoAlerta = 'error';
              this.titulo = 'Lo sentimos';
              this.mensajeAlerta = jsonStrings.messages["404generarCertificado"];
            } else {
              this.mostrarAlerta = true;
              this.tipoAlerta = 'error';
              this.titulo = 'Lo sentimos';
              this.mensajeAlerta = jsonStrings.messages["0generarCertificado"];
            }
            this.setStep('2');
          }
        );

    }
  }

  validar() {
    this.invalidForm = false;
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.titulo = '';
    this.setStep('2');
    if (!this.validarCertificadoForm.isValid()) {
      this.invalidForm = true;
      this.mostrarAlerta = true;
      this.tipoAlerta = 'error';
      this.titulo = 'Lo sentimos';
      this.mensajeAlerta = jsonStrings.messages["camposObligatorios"];
      this.setStep('2');
    } else {
      this.mostrarAlerta = false;
      this.dataValidar.IdCertificado = this.validarCertificadoForm.getFormValues().idCertificado;
      this.censoIndigenaService.postValidarCertificado(this.dataValidar)
        .subscribe(
          (data) => {
            this.mostrarAlerta = true;
            this.tipoAlerta = 'success';
            this.titulo = jsonStrings.messages["200validarCertificado"];
            this.mensajeAlerta = '';
            let blob = new Blob([data], { type: 'application/pdf' });
            let url = window.URL.createObjectURL(blob);

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, "certificado_validacion.pdf");
              this.setStep('4');
            } else {
              let pwa = window.open(url);
              if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
                alert(jsonStrings.messages["habilitarPopUpNavegador"]);
              }
              this.setStep('4');
            }
          },
          (error) => {
            if (error.status == 404) {
              this.mostrarAlerta = true;
              this.tipoAlerta = 'error';
              this.titulo = 'Lo sentimos';
              this.mensajeAlerta = jsonStrings.messages["404validarCertificado"];
            } else {
              this.mostrarAlerta = true;
              this.tipoAlerta = 'error';
              this.titulo = 'Lo sentimos';
              this.mensajeAlerta = jsonStrings.messages["0generarCertificado"];
            }
            this.setStep('2');
          }
        );

    }
  }
}
