import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-prestadores-detalle-modal',
  templateUrl: './prestadores-detalle-modal.component.html',
  styleUrls: ['./prestadores-detalle-modal.component.scss']
})
export class PrestadoresDetalleModalComponent implements OnInit {

  formGroup: any;

  constructor(private activeModal: NgbActiveModal, private concultaService: MinsaludConsultaUtilService) {
    this.concultaService.inicializarRegistroSeleccionado();
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  descargarResultados(){
    this.concultaService.asignarDescargaCompleta(true);
  }

  closeModalConDescarga() {
    this.descargarResultados();
    this.closeModal();
  }

}
