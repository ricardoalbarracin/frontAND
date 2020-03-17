import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObtenerGsmiForm } from './obtener-gsmi-form';
import { ValidarGsmiService } from '../../services/validar-gsmi.service';
import jsonStrings from '@stringResources/tramites/certificado-rspp.json';
import { DatosSolicitud } from '../../models/validar-gsmi';


@Component({
  selector: 'app-obtener-gsmi',
  templateUrl: './obtener-gsmi.component.html',
  styleUrls: ['./obtener-gsmi.component.scss']
})
export class ObtenerGsmiComponent implements OnInit {

  formObtenerGsmi: ObtenerGsmiForm;
  generarFormObtenerGsmi: FormGroup;
  dataGenerar: DatosSolicitud;
  public noticeMessage: string;
  mostrarAlerta: boolean = false;
  tipoAlerta: string;
  mensajeAlerta: string;
  titulo: string;
  invalidForm: boolean = false;

  constructor(private service: ValidarGsmiService) {
    this.getParams();
    this.formObtenerGsmi = new ObtenerGsmiForm();
    this.buildForm();
    this.dataGenerar = new DatosSolicitud();
  }

  ngOnInit() { }

  buildForm() {
    this.generarFormObtenerGsmi = this.formObtenerGsmi.getForm();
  }

  getParams() {
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  limpiarFormulario() {
    this.buildForm();
    this.generarFormObtenerGsmi.get('digitosNumeroGsmi').setValue(null);
    this.generarFormObtenerGsmi.get('codigoValidador').setValue(null);
    this.invalidForm = false;
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.titulo = '';
    this.setStep('2');
  }

  limpiar() {
    this.mostrarAlerta = false;
    this.setStep('2');
  }

  buscar() {
    this.invalidForm = false;
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.titulo = '';
    this.setStep('2');
    if (!this.formObtenerGsmi.isValid()) {
      this.invalidForm = true;
      this.mostrarAlerta = true;
      this.tipoAlerta = 'error';
      this.titulo = 'Lo sentimos';
      this.mensajeAlerta = jsonStrings.messages["camposObligatorios"];
      this.setStep('2');
    } else {
      this.mostrarAlerta = false;
      this.dataGenerar.digitos_numero_gsmi = this.formObtenerGsmi.getFormValues().digitosNumeroGsmi;
      this.dataGenerar.codigo_validador = this.formObtenerGsmi.getFormValues().codigoValidador;
      this.service.GetInformacion(this.dataGenerar)
        .subscribe(
          (data) => {
            this.mostrarAlerta = true;
            this.tipoAlerta = 'success';
            this.titulo = jsonStrings.messages["200generarCertificado"];
            this.mensajeAlerta = '';
            // aca va lo otro
            this.setStep('4');
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

}
