import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConductaAlertaForm } from './conducta-alerta-form';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';

@Component({
  selector: 'app-conducta-alerta',
  templateUrl: './conducta-alerta.component.html',
  styleUrls: ['./conducta-alerta.component.scss']
})
export class ConductaAlertaComponent implements OnInit {
  submitted = false;
  seleccionForm: FormGroup;
  seleccionSolucionForm: ConductaAlertaForm;
  listaOpcionAlerta: any[];
  invalidForm: boolean;
  codigosTipoAlterta: number[];
  hechos: string;
  isError = true;
  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new ConductaAlertaForm();
    this.buildForm();
    this.cargar_opciones();
  }
  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }
  get f() { return this.seleccionForm.controls; }
  continuar() {
    this.submitted = true;
    this.isError = false;
    if (this.seleccionForm.invalid) {
      return;
    }
    this.accion_continuar();
  }
  accion_continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/adjunta_documento']);
    } else {
      this.invalidForm = true;
      return;
    }
    this.codigosTipoAlterta = [this.seleccionForm.value.opcion];
    this.hechos = this.seleccionForm.value.denuncia;
    sessionStorage.setItem('codigosTipoAlerta', JSON.stringify(this.codigosTipoAlterta));
    sessionStorage.setItem('hechos', JSON.stringify(this.hechos));
  }

  accion_anterior() {
    this.router.navigate(['/sic/datos_denuncio']);
  }

  cargar_opciones() {
    this.sicUtils.getListaGenericas('TIPO_CONDUCTA_ALERTA')
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaOpcionAlerta = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  inactiveDetail() {}
}
