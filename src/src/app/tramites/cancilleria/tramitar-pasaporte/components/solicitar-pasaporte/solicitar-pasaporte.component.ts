import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SolicitarPasaporteForm } from './solicitar-pasaporte-form'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';
import { AvisoPrivacidadModalComponent } from '../aviso-privacidad-modal/aviso-privacidad-modal.component';
import { AyudaPasaporteModalComponent } from '../ayuda-pasaporte-modal/ayuda-pasaporte-modal.component';
import { TramitarPasaporteService } from '../../services/tramitar-pasaporte.service';
import { DataSolicitudPasaporteModel } from '../../models/dataSolicitudPasaporteModel';


@Component({
  selector: 'app-solicitar-pasaporte',
  templateUrl: './solicitar-pasaporte.component.html',
  styleUrls: ['./solicitar-pasaporte.component.scss']
})

export class SolicitarPasaporteComponent implements OnInit {

  SolicitarPasaporteForm: SolicitarPasaporteForm;
  solicitudPasaporteForm: FormGroup;
  paramsList: any;
  invalidForm: boolean = false;
  public listTipoDocumento = [];
  public listTipoPasaporte = [];
  public listMotivoSolicitud = [];
  public listOficinas = [];
  showMotivos: boolean = false;
  mensajeAvisoInicial: string = "";
  mensajeAvisoFinal: string = "";
  mensajeTratamiento: string = "";
  mensajeConsentimiento: string = "";
  dataSolicitudPasaporteModel: DataSolicitudPasaporteModel;
  currentMessage: any;

  constructor(private tramiteService: TramitarPasaporteService, private modalService: NgbModal, private modalNotificationService: ConfirmModalService, private router: Router) {
    this.SolicitarPasaporteForm = new SolicitarPasaporteForm();
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
    this.solicitudPasaporteForm = this.SolicitarPasaporteForm.getForm();
    this.setStep("2");
  }

  getParams() {
    this.getTipoDocumento();
    this.getListadoOficinas();
    this.getTipoPasaporte();
    this.changeTipoPasaporte();
    this.getTratamientoDatos();
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  changeTipoPasaporte() {
    this.solicitudPasaporteForm.get('tipoPasaporte').valueChanges.subscribe(
      (tipoPasaporte) => {
        this.solicitudPasaporteForm.get("motivoSolicitud").setValue('');
        this.solicitudPasaporteForm.get("motivoSolicitud").disable();

        this.getMotivosSolicitud(Number(tipoPasaporte.value));
      });
  }

  getListadoOficinas(): void {
    this.tramiteService.getListadoOficinas().subscribe((data: any[]) => {
      if (data != undefined && data.length > 0) {
        this.listOficinas = data;
      }
    }, (error) => {
      console.error(error);
    });
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

  getTipoPasaporte(): void {
    this.tramiteService.getTiposPasaporte().subscribe((data: any) => {
      if (data != undefined && data.length > 0) {
        this.listTipoPasaporte = data;
      }
    }, (error) => {
      console.error(error);
    });
  }

  getMotivosSolicitud(tipoPasaporte: number): void {
    this.tramiteService.getMotivosSolicitud(tipoPasaporte).subscribe((data: any) => {
      if (data != undefined && data.length > 0) {
        this.listMotivoSolicitud = data;
        this.solicitudPasaporteForm.get("motivoSolicitud").enable();
      }
    }, (error) => {
      console.error(error);
    });
  }

  save() {
    if (this.SolicitarPasaporteForm.isValid()) {
      this.invalidForm = true;
      return;
    }

    //Datos de la solicitud.
    this.dataSolicitudPasaporteModel = {
      motivoSolicitud: this.SolicitarPasaporteForm.form.value.motivoSolicitud.value,
      oficina: this.SolicitarPasaporteForm.form.value.oficinaSolicitud.value,
      tipoPasaporte: this.SolicitarPasaporteForm.form.value.tipoPasaporte.value,
      digitoVerificacionOCR: this.SolicitarPasaporteForm.form.value.digitoVerificacion,
      fechaExpedicionPasaporte: this.SolicitarPasaporteForm.form.value.fechaExpedicionPasaporte,
      numeroPasaporte: this.SolicitarPasaporteForm.form.value.numeroPasaporte,
      codigoDocumento: this.SolicitarPasaporteForm.form.value.tipoDocumento.value,
      correoElectronico: this.SolicitarPasaporteForm.form.value.email,
      fechaExpedicionDocIdentidad: this.SolicitarPasaporteForm.form.value.fechaExpedicion,
      numeroPersonal: this.SolicitarPasaporteForm.form.value.numeroDocumento
    };

    this.tramiteService.insSolicitudPasaporte(this.dataSolicitudPasaporteModel).subscribe((data: any) => {
      var result = JSON.parse(data);
      if (result.return != null) {
        if (result.return.outDetalleRespuesta.codigo != 1) {
          this.modalNotificationService.openNotificationDialog(
            "Error",
            result.return.outDetalleRespuesta.mensaje,
            "error",
            () => {
              return;
            })
        }
        else {
          this.modalNotificationService.openNotificationDialog(
            "Guardado",
            result.return.outDetalleRespuesta.mensaje,
            "success",
            () => {
              this.router.navigate(["/cancilleria/pagarPasaporte", data]);
            })
        }
      }
    }, (error) => {
      this.currentMessage.title = 'Lo sentimos';
      this.currentMessage.type = 'error';
      this.currentMessage.message = 'Los datos ingresados son incorrectos, te recomendamos:\n';
      this.currentMessage.message += '1. revise que los datos ingresados sean los solicitados';
      console.error(error);
    });

  }

  showAvisoPrivacidad() {
    this.modalService.open(AvisoPrivacidadModalComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: false
    });
  }

  showAyuda() {
    this.modalService.open(AyudaPasaporteModalComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: false
    });
  }

  clean() {
    this.modalNotificationService.openConfirmDialog(
      "Limpiar formulario",
      "Al limpiar el formulario perderás los datos ingresados",
      "error",
      this.resetForm(),
      null)
  }

  resetForm() {
    this.solicitudPasaporteForm.reset();
    this.invalidForm = false;
  }

  getTratamientoDatos(): void {
    this.tramiteService.getTratamientoDatos().subscribe((data: any[]) => {
      if (data != undefined && data != null) {
        this.mensajeTratamiento = data["return"].mensajeTratamiento;
        this.mensajeConsentimiento = data["return"].mensajeConsentimiento;
        this.mensajeAvisoInicial = data["return"].mensajeAviso.substring(0, data["return"].mensajeAviso.indexOf("{"));
        this.mensajeAvisoFinal = data["return"].mensajeAviso.substring(data["return"].mensajeAviso.indexOf("}") + 1);
      }
    }, (error) => {
      console.error(error);
    });
  }

}
