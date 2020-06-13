import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";
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
  cadena_direccion: string = '';
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DireccionForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
    this.seleccionSolucionForm.addComplemento();
  }

  obtenerDireccion() {
    let cadena = '';
    Object.keys(this.seleccionForm.controls).forEach((key: string) => {
      let control = this.seleccionForm.get(key);
      if (control != null)
        if(!(control instanceof FormArray))
          cadena += control.value.text == null ? control.value + ' ' : control.value.text + ' ';
    });
    for (let control of this.seleccionSolucionForm.complementos.controls) {
      let fg = (control as FormGroup);
      if (fg.controls.tipo_complemento.value.text)
        cadena += ` ${fg.controls.tipo_complemento.value.text} ${fg.controls.descripcion_complemento.value} `
    }
    return cadena;
  }

  enviarDireccion() {
    if(this.seleccionSolucionForm.isValid())
      this.messageEvent.emit(this.obtenerDireccion());
    else
    {
      this.invalidForm = true;
      return;
    }
  }

  agregarComplemento() {
    this.seleccionSolucionForm.addComplemento();
  }

  cancelar() {
    this.messageEvent.emit('%&/$');
  }

}
