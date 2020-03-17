import { Component, OnInit } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-minsalud-consulta-capacidad-detalle',
  templateUrl: './capacidad-detalle.component.html',
  styleUrls: ['./capacidad-detalle.component.scss']
})
export class CapacidadDetalleComponent implements OnInit {
  modal: any;

  constructor(private concultaService: MinsaludConsultaUtilService, private modalService: NgbModal) {
    this.concultaService.asignarDescargaCompleta(false);
  }

  ngOnInit() {}
  closeModalConDescarga() {
    this.descargarResultados();
    this.modalService.dismissAll();
  }
  descargarResultados() {
    this.concultaService.asignarDescargaCompleta(true);
  }
}
