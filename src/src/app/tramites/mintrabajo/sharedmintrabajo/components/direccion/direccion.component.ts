import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DireccionForm } from './direccion.form';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent implements OnInit {

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
  cadena_direccion:string = 'Avenida siempreviva 1234';
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DireccionForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
    this.seleccionSolucionForm.addComplemento();
  }

  enviarDireccion(){
    this.messageEvent.emit(this.cadena_direccion);
  }

  agregarComplemento() {
    for (let control of this.seleccionSolucionForm.complementos.controls){
      const temp = (control as FormGroup).controls.descripcion_complemento.value;
      alert (temp);
    }
    this.seleccionSolucionForm.addComplemento();
  }

  cancelar() {
    this.messageEvent.emit('%&/$');
  }

}
