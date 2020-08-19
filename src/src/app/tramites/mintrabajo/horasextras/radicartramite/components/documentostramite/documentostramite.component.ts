import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubirarchivoComponent } from 'src/app/tramites/mintrabajo/sharedmintrabajo/components/subirarchivo/subirarchivo.component';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { DocumentostramiteForm } from './documentostramite.form';
import { UtilsService } from 'src/app/tramites/mintrabajo/sharedmintrabajo/utils/utils.service';

@Component({
  selector: 'app-documentostramite',
  templateUrl: './documentostramite.component.html',
  styleUrls: ['./documentostramite.component.scss']
})
export class DocumentostramiteComponent implements OnInit {

  convenciones_colectivas: string;
  reglamento_trabajo: string;
  organizaciones_sindicales: string;
  adj_cartasolici: boolean = true;
  seleccionForm: FormGroup;
  seleccionSolucionForm: DocumentostramiteForm;
  invalidForm: boolean = false;

  constructor(private modalService: NgbModal, private router: Router,private utils:UtilsService) { }

  ngOnInit() {
    this.convenciones_colectivas = sessionStorage.convenciones_colectivas;
    this.reglamento_trabajo = sessionStorage.reglamento_trabajo;
    this.organizaciones_sindicales = sessionStorage.organizaciones_sindicales;
    this.seleccionSolucionForm = new DocumentostramiteForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  SeleccionarArchivo() {
    let modal = this.modalService.open(SubirarchivoComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });
    this.adj_cartasolici = !this.adj_cartasolici;
  }

  regresar() {
    this.router.navigate(['/mintrabajo/remitente']);
  }

  radicar() {
    this.router.navigate(['/mintrabajo/registro']);
    this.utils.estadoTramite('4');
  }

}
