import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosRemitenteForm } from './datosremitente.form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccionmodalComponent } from '../direccionmodal/direccionmodal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datosremitente',
  templateUrl: './datosremitente.component.html',
  styleUrls: ['./datosremitente.component.scss']
})
export class DatosremitenteComponent implements OnInit {

  listaOpciones: any[] = [
    {
      text: 'Opcion 1',
      value: 1
    },{
      text: 'Opcion 2',
      value: 2
    }, {
      text: 'Opcion 3',
      value: 3
    }, {
      text: 'Opcion 4',
      value: 4
    },
  ]

  direccion: string;

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosRemitenteForm;
  invalidForm: boolean = false;
  unsubscribe$ = new Subject<void>();

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosRemitenteForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  abrirDireccion() {
    let modal = this.modalService.open(DireccionmodalComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });

    modal.componentInstance.messageEvent.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((mensaje: string) => {
      if (mensaje === '%&/$')
        modal.close();
      else {
        this.direccion = mensaje;
        modal.close();
      }
    });
  }

  eliminarDireccion(){
    this.direccion = '';
  }

  atras(){
    this.router.navigate(['/mintrabajo/descripcion']);
  }

  cancelar(){
    this.router.navigate(['/mintrabajo']);
  }

  continuar(){
    this.router.navigate(['/mintrabajo/documentos']);
  }

}
