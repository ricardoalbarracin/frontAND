import { NgModule, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-servicios-detalle-modal',
  templateUrl: './servicios-detalle-modal.component.html',
  styleUrls: ['./servicios-detalle-modal.component.scss']
})
export class ServiciosDetalleModalComponent implements OnInit {

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
