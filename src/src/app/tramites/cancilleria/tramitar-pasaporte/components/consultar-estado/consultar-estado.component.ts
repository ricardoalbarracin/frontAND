import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsultarEstadoForm } from './consultar-estado-form'
import { TramitarPasaporteService } from '../../services/tramitar-pasaporte.service';
import { DataConsultaSolicitudModel } from '../../models/consultaSolicitudModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-estado',
  templateUrl: './consultar-estado.component.html',
  styleUrls: ['./consultar-estado.component.scss']
})
export class ConsultarEstadoComponent implements OnInit {
  ConsultarEstadoForm: ConsultarEstadoForm;
  consultarEstado: FormGroup;
  paramsList: any;
  invalidForm: boolean = false;
  failConsulta: boolean = false;
  public listTipoDocumento = [];
  dataConsultaSolicitudModel: DataConsultaSolicitudModel;
  currentMessage: any;
  constructor(private tramiteService: TramitarPasaporteService, private router: Router) {
    this.ConsultarEstadoForm = new ConsultarEstadoForm();
    this.buildForm();
    this.getParams();
    this.currentMessage = {
      title: '',
      message: '',
      type: ''
    };
  }

  ngOnInit() {
  }

  buildForm() {
    this.consultarEstado = this.ConsultarEstadoForm.getForm();
    this.setStep("2");
  }

  getParams() {
    this.getTipoDocumento();
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  getTipoDocumento(): void {
    this.tramiteService.getTiposDocumento().subscribe((data: any) => {
      if (data != undefined) {
        this.listTipoDocumento.push(data);
      }
    }, (error) => {
      console.error(error);
    });
  }

  consultar() {
    if (!this.ConsultarEstadoForm.isValid()) {
      this.invalidForm = true;
      return;
    }

    //Datos para realizar la consulta de la solicitud.
    this.dataConsultaSolicitudModel = {
      numeroDocumentoIdentidad: String(this.ConsultarEstadoForm.form.value.numeroDocumento),
      numeroSolicitud: this.ceroIzquierda(String(this.ConsultarEstadoForm.form.value.numeroSolicitud), 15),
      nacionalidad: "COL",
      tipoDocumentoIdentidad: this.ConsultarEstadoForm.form.value.tipoDocumento.value,
      usuario: "UserWSEstado",
      contrasena: "passWSEstado",
      fuente: "GOVCO"
    };

    this.tramiteService.getDataSolicitud(this.dataConsultaSolicitudModel).subscribe((data: any) => {
      if (data.return != null) {
        this.router.navigate(["/cancilleria/estadoSolicitud", data.return.nombres, data.return.tipoTramite, "Cédula de ciudadania", data.return.numeroSolicitud, data.return.numeroDocumento, data.return.oficinaExpedidora, data.return.textoEstadoActual]);        
      } else {
        this.currentMessage.title = 'Lo sentimos';
        this.currentMessage.type = 'error';
        this.currentMessage.message = 'Los datos ingresados son incorrectos, te recomendamos:\n';
        this.currentMessage.message += '1. revise que los datos ingresados sean los solicitados';
      }
      this.failConsulta = true;
    }, (error) => {
      this.failConsulta = true;
      this.currentMessage.title = 'Lo sentimos';
      this.currentMessage.type = 'error';
      this.currentMessage.message = 'Los datos ingresados son incorrectos, te recomendamos:\n';
      this.currentMessage.message += '1. revise que los datos ingresados sean los solicitados';
      console.error(error);
    });
  }

  ceroIzquierda(cadena: string, longitud: number) {
    for (var i = cadena.length; i < longitud; i++) {
      cadena = "0" + cadena;
    }
    return cadena;
  }

}