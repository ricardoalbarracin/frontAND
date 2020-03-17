import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';


@Component({
  selector: 'app-seguridad-detalle-modal',
  templateUrl: './seguridad-detalle-modal.component.html',
  styleUrls: ['./seguridad-detalle-modal.component.scss']
})
export class SeguridadDetalleModalComponent implements OnInit {

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
