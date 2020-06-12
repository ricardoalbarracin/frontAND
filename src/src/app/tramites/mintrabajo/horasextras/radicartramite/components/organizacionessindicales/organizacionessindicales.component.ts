import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrganizacionesSindicalesForm } from './organizacionessindicales.form';
//import { DireccionComponent } from 'src/app/tramites/mintrabajo/sharedmintrabajo/components/direccion/direccion.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DireccionmodalComponent } from '../direccionmodal/direccionmodal.component';

@Component({
  selector: 'app-organizacionessindicales',
  templateUrl: './organizacionessindicales.component.html',
  styleUrls: ['./organizacionessindicales.component.scss']
})
export class OrganizacionessindicalesComponent implements OnInit {

  @Output()
  listOrganizacionesSindicales = [];

  seleccionForm: FormGroup;
  seleccionSolucionForm: OrganizacionesSindicalesForm;
  invalidForm: boolean = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.seleccionSolucionForm = new OrganizacionesSindicalesForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  limpiarOrganizacionSindical() {
    this.seleccionForm.reset();
    this.invalidForm = false;
    /*Object.keys(this.seleccionForm.controls).forEach((key: string) => {
      this.seleccionForm.controls[key].setValue('');
    });*/
  }

  eliminarOrganizacionSindical(d) {
    const index = this.listOrganizacionesSindicales.indexOf(d);
    this.listOrganizacionesSindicales.splice(index, 1);
  }

  agregarOrganizacionSindical() {
    if (this.seleccionSolucionForm.isValid()) {
      this.listOrganizacionesSindicales.push({
        nombre: this.seleccionForm.value.nombre,
        sigla: this.seleccionForm.value.sigla,
        numero: this.seleccionForm.value.numero,
        direccion: this.seleccionForm.value.direccion,
      });
      this.limpiarOrganizacionSindical();
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  abrirDireccion() {
    let modal = this.modalService.open(DireccionmodalComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });

    modal.componentInstance.messageEvent.subscribe((mensaje) => {
      if (mensaje === '%&/$')
        modal.close();
      else {
        alert('Mensaje desde el abuelo ' + mensaje);
        modal.close();
      }
    });
  }

}
