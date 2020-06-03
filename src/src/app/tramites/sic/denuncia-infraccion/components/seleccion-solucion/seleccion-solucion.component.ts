import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeleccionSolucionForm } from './seleccion-solucion-form';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';

@Component({
  selector: 'app-seleccion-solucion',
  templateUrl: './seleccion-solucion.component.html',
  styleUrls: ['./seleccion-solucion.component.scss']
})
export class SeleccionSolucionComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: SeleccionSolucionForm;
  messages: any;
  invalidForm = false;
  listaOpcionSolucion: any = [];

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new SeleccionSolucionForm();
    this.messages = {
      warning_definicion_denuncia: jsonStrings.messages.warning_definicion_denuncia
    };
    this.buildForm();
    this.cargar_opciones();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  accion_continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/datos_denunciante']);
    } else {
      this.invalidForm = true;
      return;
    }
  }

  cargar_opciones() {
    this.sicUtils.getListaGenericas('PRETENCIONES_SOLICITUD')
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaOpcionSolucion = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  inactiveDetail() {}
}
