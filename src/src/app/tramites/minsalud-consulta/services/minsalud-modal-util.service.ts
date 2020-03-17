import { Injectable } from '@angular/core';
import { PrestadoresDetalleModalComponent } from '../components/prestadores/prestadores-detalle-modal/prestadores-detalle-modal.component';
import { SedesDetalleModalComponent } from '../components/sedes/sedes-detalle-modal/sedes-detalle-modal.component';
import { ServiciosDetalleModalComponent } from '../components/servicios/servicios-detalle-modal/servicios-detalle-modal.component';
import { CapacidadDetalleModalComponent } from '../components/capacidad/capacidad-detalle-modal/capacidad-detalle-modal.component';
import { SeguridadDetalleModalComponent } from '../components/seguridad/seguridad-detalle-modal/seguridad-detalle-modal.component';
import { SancionesDetalleModalComponent } from '../components/sanciones/sanciones-detalle-modal/sanciones-detalle-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class MinsaludModalUtilService {

  componentsType = [
    {
      name: 'Prestadores',
      component: PrestadoresDetalleModalComponent
    },
    {
      name: 'Sedes',
      component: SedesDetalleModalComponent
    },
    {
      name: 'Servicios',
      component: ServiciosDetalleModalComponent
    },
    {
      name: 'Capacidad',
      component: CapacidadDetalleModalComponent
    },
    {
      name: 'Medidas de seguridad',
      component: SeguridadDetalleModalComponent
    },
    {
      name: 'Sanciones',
      component: SancionesDetalleModalComponent
    },

  ];

  constructor(public modalService: NgbModal) { }
  // Función general para el evento de abrir modal sobre la tabla detalle
  getDetail = (item, opt) => {
    const componentDetail = this.componentsType.find(p => p.name === opt);
    const modal = this.modalService.open(componentDetail.component, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-detail-govco'
    });
    modal.componentInstance.data = item;
  }

}
