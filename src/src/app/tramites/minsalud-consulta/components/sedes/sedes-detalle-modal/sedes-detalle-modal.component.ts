import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';

@Component({
  selector: 'app-sedes-detalle-modal',
  templateUrl: './sedes-detalle-modal.component.html',
  styleUrls: ['./sedes-detalle-modal.component.scss']
})
export class SedesDetalleModalComponent implements OnInit {

  constructor(    private activeModal: NgbActiveModal, private concultaService: MinsaludConsultaUtilService) { }

  ngOnInit() {
  }

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
