import { Component, OnInit } from '@angular/core';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultarSolicitudForm } from './consultar-solicitud.form';
import { ReturnModelObtenerSolicitudes } from '../../models/returnmodelobtenersolicitudes';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styleUrls: ['./consultar-solicitud.component.scss']
})
export class ConsultarSolicitudComponent implements OnInit {
  seleccionForm: FormGroup;
  seleccionSolucionForm: ConsultarSolicitudForm;
  invalidForm: boolean = false;
  items: Array<any> = [];
  consultarVerConcepto: boolean = false;
  verInformacionDescargar: boolean = false;
  mensajeConsultaSinResultados: boolean = false;

  constructor(public formBuilder: FormBuilder, public service: AutorizarExportacionUtilService) {

  }

  establecerAreaNotificaciones(value: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', value);
  }

  consultar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.service.ConsultarListaAnexosSolicitudesXRango(this.seleccionForm.value.numero_documento, this.seleccionForm.value.numero_radicado).subscribe((response: ReturnModelObtenerSolicitudes) => {
        //debugger;
        if (response.result.solicitudSalidaObras) {
          this.items = [];
          for (let solicitud of response.result.solicitudSalidaObras) {
            this.items.push(solicitud);
          }
          this.mensajeConsultaSinResultados = false;
          this.establecerAreaNotificaciones('4');
        }
        else
          this.mensajeConsultaSinResultados = true;
      }, error => {
        console.error(error);
      });

    } else {
      this.invalidForm = true;
      return;
    }
  }

  verResultado() {
    this.consultarVerConcepto = !this.consultarVerConcepto;
  }

  limpiarCampos() {
    this.seleccionForm.reset();
    this.invalidForm = false;
    this.verInformacionDescargar = false;
    this.consultarVerConcepto = false;
    this.items = [];
  }

  verEditar() {

  }

  verDescargar() {
    this.verInformacionDescargar = !this.verInformacionDescargar;
  }

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultarSolicitudForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

}
