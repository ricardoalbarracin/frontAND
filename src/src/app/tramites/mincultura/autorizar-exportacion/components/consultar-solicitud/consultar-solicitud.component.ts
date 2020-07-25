import { Component, OnInit } from '@angular/core';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultarSolicitudForm } from './consultar-solicitud.form';
import { ReturnModelObtenerSolicitudes } from '../../models/returnmodelobtenersolicitudes';
import { Solicitudsalidaobra } from '../../models/solicitudsalidaobra';
import { Router } from '@angular/router';

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

  constructor(public formBuilder: FormBuilder, public service: AutorizarExportacionUtilService, private router:Router) {

  }

  establecerAreaNotificaciones(value: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', value);
  }

  almacenarDatosStorage(solicitud){
    debugger;
    sessionStorage.tipo_solicitante = solicitud.docIdSolicitante;
    sessionStorage.numero_documento = solicitud.sosNroDocumentoSolicitante;
    sessionStorage.tipo_documento = solicitud.docIdSolicitante;
    sessionStorage.nombre_solicitante = solicitud.sosNombreSolicitante;
    sessionStorage.lugar_expedicion = solicitud.sosLugarExpedicion;
    sessionStorage.direccion_solicitante = solicitud.sosDireccionSolicitante;
    sessionStorage.telefono_solicitante = solicitud.sosTelefonoSolicitante;
    sessionStorage.correo_solicitante = solicitud.sosCorreoSolicitante;

    sessionStorage.docIdIntermediario = solicitud.docIdIntermediario;
    sessionStorage.sosSinoIntermediario = solicitud.sosSinoIntermediario;
    sessionStorage.sosSinoAnexos = solicitud.sosSinoAnexos;
    sessionStorage.sosNroDocumentoIntermediario = solicitud.sosNroDocumentoIntermediario;
    sessionStorage.sosNombreIntermediario = solicitud.sosNombreIntermediario;
    sessionStorage.solicitud_id = solicitud.solicitudId;
  }

  consultar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.service.ConsultarSolicitudesXRango(this.seleccionForm.value.numero_documento, this.seleccionForm.value.numero_radicado).subscribe((response: ReturnModelObtenerSolicitudes) => {
        //debugger;
        if (response.result.solicitudSalidaObras) {
          this.items = [];
          sessionStorage.clear();
          for (let solicitud of response.result.solicitudSalidaObras) {
            this.items.push(solicitud);
            this.almacenarDatosStorage(solicitud);
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
    this.router.navigate(['/autorizar-exportacion/ingresar']);
  }

  verDescargar() {
    this.verInformacionDescargar = !this.verInformacionDescargar;
  }

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultarSolicitudForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

}
