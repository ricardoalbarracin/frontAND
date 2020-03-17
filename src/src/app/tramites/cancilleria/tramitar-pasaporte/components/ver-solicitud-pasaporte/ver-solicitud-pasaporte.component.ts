import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VerSolicitudPasaporteForm }  from './ver-solicitud-pasaporte-form'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from  '@shared/dialog-modal/services/confirm-modal.service';
import { Router } from '@angular/router';
import { AyudaPasaporteModalComponent } from '../ayuda-pasaporte-modal/ayuda-pasaporte-modal.component';


@Component({
  selector: 'app-ver-solicitud-pasaporte',
  templateUrl: './ver-solicitud-pasaporte.component.html',
  styleUrls: ['./ver-solicitud-pasaporte.component.scss']
})
export class VerSolicitudPasaporteComponent implements OnInit {

  VerSolicitudPasaporteForm: VerSolicitudPasaporteForm;
  verSolicitudPasaporteForm: FormGroup; 
  paramsList : any;
  invalidForm: boolean = false;
  public listTipoDocumento = [{ text: 'Cédula ciudadanía', value: 1}, { text: 'Tarjeta de identidad', value: 2}];
  public listTipoPasaporte = [{ text: 'Ordinario', value: 1}, { text: 'Normal', value: 2}];
  public listMotivoSolicitud = [{ text: 'Cambio', value: 1}, { text: 'Renovación', value: 2}];
  public listOficinas = [{ text: 'Bogotá, Oficina 1', value: 1}, { text: 'Medellín, Oficina 1', value: 2}];

  constructor(private modalService: NgbModal, private modalNotificationService: ConfirmModalService, private router: Router) { 
    this.VerSolicitudPasaporteForm = new VerSolicitudPasaporteForm();
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.verSolicitudPasaporteForm = this.VerSolicitudPasaporteForm.getForm();
  }


  showAyuda() {
    this.modalService.open(AyudaPasaporteModalComponent, { size: 'lg', 
      backdrop: "static",
      keyboard: false
    });
  }

}

