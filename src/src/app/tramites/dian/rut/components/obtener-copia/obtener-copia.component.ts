import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ObtenerCopiaForm } from './obtener-copia-form';
import { RutService } from '../../services/rut.service';
import jsonStrings from '@stringResources/tramites/obtener-copia-rut.json';
import { DatosPersonales } from '../../models/obtener-copia-rut';

@Component({
  selector: 'app-obtener-copia',
  templateUrl: './obtener-copia.component.html',
  styleUrls: ['./obtener-copia.component.scss']
})
export class ObtenerCopiaComponent implements OnInit {

  formObtenerCopia: ObtenerCopiaForm;
  generarFormObtenerCopia: FormGroup;
  dataGenerar: DatosPersonales;
  public noticeMessage: string;
  tiposDocumentos: any;
  mostrarAlerta: boolean = false;
  tipoAlerta: string;
  mensajeAlerta: string;
  titulo: string;
  invalidForm: boolean = false;

  constructor(private service: RutService) {
    this.getParams();
    this.formObtenerCopia = new ObtenerCopiaForm();
    this.buildForm();
    this.tiposDocumentos = [];
    this.dataGenerar = new DatosPersonales();
  }

  ngOnInit() { }

  buildForm() {
    this.generarFormObtenerCopia = this.formObtenerCopia.getForm();
  }

  getParams() {
    this.service.getTiposDocumento()
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

  actualizarDocumento() {
    this.mostrarAlerta = false;
    this.setStep('2');
    this.generarFormObtenerCopia.get('numeroDocumento').setValue(null);
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
    if (!this.formObtenerCopia.isValid()) {
      this.invalidForm = true;
      this.mostrarAlerta = true;
      this.tipoAlerta = 'error';
      this.titulo = 'Lo sentimos';
      this.mensajeAlerta = jsonStrings.messages["camposObligatorios"];
      this.setStep('2');
    } else {
      this.mostrarAlerta = false;
      this.dataGenerar.tipo_documento = this.formObtenerCopia.getFormValues().tipoDocumento.value;
      this.dataGenerar.numero_documento = this.formObtenerCopia.getFormValues().numeroDocumento;
      this.service.GetCertificado(this.dataGenerar)
        .subscribe(
          (data) => {
            this.mostrarAlerta = true;
            this.tipoAlerta = 'success';
            this.titulo = jsonStrings.messages["200generarCertificado"];
            this.mensajeAlerta = '';
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
