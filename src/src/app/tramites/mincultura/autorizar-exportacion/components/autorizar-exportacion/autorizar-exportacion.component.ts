import { IniciarComponent } from './../iniciar/iniciar.component';
// import { IniciarSesionComponent } from './../iniciar-sesion/iniciar-sesion.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autorizar-exportacion',
  templateUrl: './autorizar-exportacion.component.html',
  styleUrls: ['./autorizar-exportacion.component.scss']
})
export class AutorizarExportacionComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
  }

  abrirIniciarSesionModal() {
    this.modalService.open(IniciarComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });
  }

  consultarSolicitud() {
    this.router.navigate(['/mincultura/autorizar-exportacion/consultar-solicitud']);
  }

}
