import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObtenerRsppForm } from './obtener-rspp-form';
import { DescargarRsppService } from '../../services/descargar-rspp.service';
import jsonStrings from '@stringResources/tramites/certificado-rspp.json';
import { DatosSolicitud } from '../../models/descargar-rspp';


@Component({
  selector: 'app-obtener-rspp',
  templateUrl: './obtener-rspp.component.html',
  styleUrls: ['./obtener-rspp.component.scss']
})
export class ObtenerRsppComponent implements OnInit {

  formObtenerRspp: ObtenerRsppForm;
  generarFormObtenerRspp: FormGroup;
  dataGenerar: DatosSolicitud;
  public noticeMessage: string;
  departamentos: any;
  municipios: any;
  mostrarAlerta: boolean = false;
  tipoAlerta: string;
  mensajeAlerta: string;
  titulo: string;
  invalidForm: boolean = false;

  constructor(private service: DescargarRsppService) {
    this.getParams();
    this.formObtenerRspp = new ObtenerRsppForm();
    this.buildForm();
    this.departamentos = [];
    this.municipios = [];
    this.dataGenerar = new DatosSolicitud();
  }

  ngOnInit() { }

  buildForm() {
    this.generarFormObtenerRspp = this.formObtenerRspp.getForm();
  }

  getParams() {
    this.service.getDepartamentos()
      .subscribe(
        (data) => {
          this.departamentos = data;
        },
        (error) => {
          this.departamentos = [];
        }
      );

    this.service.getMunicipiosPor(null)
      .subscribe(
        (data) => {
          this.municipios = data;
        },
        (error) => {
          this.municipios = [];
        }
      );
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  actualizarDepartamento() {
    this.mostrarAlerta = false;
    this.setStep('2');
    this.generarFormObtenerRspp.get('codigoMunicipio').setValue(null);
    this.service.getMunicipiosPor(this.formObtenerRspp.getFormValues().codigoDepartamento.value)
      .subscribe(
        (data) => {
          this.municipios = data;
        },
        (error) => {
          this.municipios = [];
        }
      );
  }

  limpiar() {
    this.mostrarAlerta = false;
    this.setStep('2');
  }

  search() {
    this.invalidForm = false;
    this.mostrarAlerta = false;
    this.tipoAlerta = '';
    this.mensajeAlerta = '';
    this.titulo = '';
    this.setStep('2');
    if (!this.formObtenerRspp.isValid()) {
      this.invalidForm = true;
      this.mostrarAlerta = true;
      this.tipoAlerta = 'error';
      this.titulo = 'Lo sentimos';
      this.mensajeAlerta = jsonStrings.messages["camposObligatorios"];
      this.setStep('2');
    } else {
      this.mostrarAlerta = false;
      this.dataGenerar.numero_documento = this.formObtenerRspp.getFormValues().numeroDocumento;
      this.dataGenerar.numero_registro_ica = this.formObtenerRspp.getFormValues().numeroRegistroIca;
      this.dataGenerar.codigo_departamento = this.formObtenerRspp.getFormValues().codigoDepartamento.value;
      this.dataGenerar.codigo_municipio = this.formObtenerRspp.getFormValues().codigoMunicipio.value;
      this.service.GetCertificado(this.dataGenerar)
        .subscribe(
          (data) => {
            this.mostrarAlerta = true;
            this.tipoAlerta = 'success';
            this.titulo = jsonStrings.messages["200generarCertificado"];
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
