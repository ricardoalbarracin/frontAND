import { Component, OnInit } from '@angular/core';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';

@Component({
  selector: 'app-ingresar-tramite',
  templateUrl: './ingresar-tramite.component.html',
  styleUrls: ['./ingresar-tramite.component.scss']
})
export class IngresarTramiteComponent implements OnInit {

  constructor(public service: AutorizarExportacionUtilService, private modalService: NgbModal) { }


  ngOnInit() {
  }

  ingresarSolicitud(){
    this.service.asignarPaso(2);
    this.service.asignarpasoIngresar(1);
  }

  consultarSolicitud(){
    this.service.asignarPaso(5);
    this.service.asignarpasoIngresar(-1);
    this.service.limpiarConsultar();
  }

  abrirLogin() {
    this.modalService.open(IniciarSesionComponent, { size: 'lg', 
      backdrop: "static",
      keyboard: false
    });
  }

}
