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

  constructor(private modalService: NgbModal, private router:Router) { }

  ngOnInit() {
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
