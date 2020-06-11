import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DescripciontramiteForm } from './descripciontramite.form';

@Component({
  selector: 'app-descripciontramite',
  templateUrl: './descripciontramite.component.html',
  styleUrls: ['./descripciontramite.component.scss']
})
export class DescripciontramiteComponent implements OnInit {

  direccionTerritorial:string;
  numero_radicado:string;
  seleccionForm: FormGroup;
  seleccionSolucionForm: DescripciontramiteForm;
  invalidForm: boolean = false;
  mostrarOrganizacionesSindicales:boolean = false;
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
  listaSistemaOrganico: any[] = [
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

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DescripciontramiteForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  AgregarDireccionTerritorial(){
    this.direccionTerritorial = this.seleccionForm.value.direccion_territorial.text;
  }

  EliminarDireccionTerritorial(){
    this.direccionTerritorial = '';
  }

  AgregarNumeroRadicado(){
    this.numero_radicado = this.seleccionForm.value.numero_radicado;
  }

  EliminarNumeroRadicado(){
    this.numero_radicado = '';
  }

  MostrarOrganizacionesSindicales(){
    this.mostrarOrganizacionesSindicales = this.seleccionForm.value.organizaciones_sindicales.text === 'Si';
  }

}
