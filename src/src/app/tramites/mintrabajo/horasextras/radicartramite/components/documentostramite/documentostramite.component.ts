import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubirarchivoComponent } from 'src/app/tramites/mintrabajo/sharedmintrabajo/components/subirarchivo/subirarchivo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentostramite',
  templateUrl: './documentostramite.component.html',
  styleUrls: ['./documentostramite.component.scss']
})
export class DocumentostramiteComponent implements OnInit {

  convenciones_colectivas:string;
  reglamento_trabajo:string;
  organizaciones_sindicales:string;

  constructor(private modalService: NgbModal, private router:Router) { }

  ngOnInit() {
    this.convenciones_colectivas = sessionStorage.convenciones_colectivas;
    this.reglamento_trabajo = sessionStorage.reglamento_trabajo;
    this.organizaciones_sindicales = sessionStorage.organizaciones_sindicales;
  }

  SeleccionarArchivo(){
    let modal = this.modalService.open(SubirarchivoComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });
  }

  regresar(){}

  radicar(){
    this.router.navigate(['/mintrabajo/registro']);
  }

}
