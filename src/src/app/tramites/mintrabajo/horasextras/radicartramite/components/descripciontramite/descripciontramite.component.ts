import { UtilsService } from '../../../../sharedmintrabajo/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DescripciontramiteForm } from './descripciontramite.form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descripciontramite',
  templateUrl: './descripciontramite.component.html',
  styleUrls: ['./descripciontramite.component.scss']
})
export class DescripciontramiteComponent implements OnInit {

  formatoRadicadoinvalido: boolean = true;
  direccionTerritorial: string;
  numero_radicado: string;
  seleccionForm: FormGroup;
  seleccionSolucionForm: DescripciontramiteForm;
  invalidForm: boolean = false;
  mostrarOrganizacionesSindicales: boolean = false;
  listaSINO: any[] = [
    {
      text: 'Si',
      value: 1
    },
    {
      text: 'No',
      value: 2
    }
  ]
  listaCiudad: any[] = [
    {
      text: 'Cali',
      value: 1
    },
    {
      text: 'Bogota',
      value: 2
    },
    {
      text: 'Medellin',
      value: 3
    }
  ]

  constructor(private router: Router, private utils: UtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DescripciontramiteForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
    this.utils.estadoTramite('2');
  }

  AgregarDireccionTerritorial() {
    if (this.seleccionForm.value.direccion_territorial.text.length > 0) {
      this.direccionTerritorial = this.seleccionForm.value.direccion_territorial.text;
      this.seleccionForm.controls['direccion_territorial'].disable();
    }
  }

  EliminarDireccionTerritorial() {
    this.direccionTerritorial = '';
    this.seleccionForm.controls['direccion_territorial'].enable();
  }

  AgregarNumeroRadicado() {
    if (this.seleccionForm.value.numero_radicado.length > 0) {
      if (this.formatoRadicadoinvalido) {
        this.numero_radicado = this.seleccionForm.value.numero_radicado;
        this.seleccionForm.controls['numero_radicado'].disable();
      }
    }
  }

  EliminarNumeroRadicado() {
    this.numero_radicado = '';
    this.seleccionForm.controls['numero_radicado'].enable();
  }

  MostrarOrganizacionesSindicales() {
    this.mostrarOrganizacionesSindicales = this.seleccionForm.value.organizaciones_sindicales.text === 'Si';
  }

  continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/mintrabajo/remitente']);
      sessionStorage.convenciones_colectivas = this.seleccionForm.controls.convenciones_colectivas.value.text;
      sessionStorage.reglamento_trabajo = this.seleccionForm.controls.reglamento_trabajo.value.text;
      sessionStorage.organizaciones_sindicales = this.seleccionForm.controls.organizaciones_sindicales.value.text;
    }
    else {
      this.invalidForm = true;
      this.utils.scrollControInvalido();
      return;
    }
  }

  cancelar() {
    this.router.navigate(['/mintrabajo']);
  }

  onKeyValidNumber() {
    let regEx = new RegExp('[0-9]{2}[A-Z]{2}[0-9]{19}');
    this.formatoRadicadoinvalido = regEx.test(this.seleccionForm.controls.numero_radicado.value);
  }

}
