import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { DireccionForm } from './direccion.form';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent implements OnInit {

  controles: any[];

  listaSINO = [
    {
      value: 1,
      text: 'Si'
    },
    {
      value: 2,
      text: 'No'
    }
  ]
  seleccionForm: FormGroup;
  seleccionSolucionForm: DireccionForm;
  invalidForm: boolean = false;

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DireccionForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
    this.seleccionSolucionForm.addComplemento();
  }

  agregarComplemento() {
    for (let control of this.seleccionSolucionForm.complementos.controls){
      const temp = (control as FormGroup).controls.descripcion_complemento.value;
      alert (temp);
    }
    this.seleccionSolucionForm.addComplemento();
  }

  aceptar() {

  }

  cancelar() {

  }

}
