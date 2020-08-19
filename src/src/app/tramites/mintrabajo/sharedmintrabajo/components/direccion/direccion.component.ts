import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup, FormArray } from "@angular/forms";
import { DireccionForm } from './direccion.form';
import { complemento } from '../../models/sharedmintrabajo.models';

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

  listaPais = [
    {
      value: 1,
      text: 'Albania'
    },
    {
      value: 2,
      text: 'Alemania'
    },
    {
      value: 3,
      text: 'Colombia'
    }
    ,
    {
      value: 4,
      text: 'Panama'
    }
  ]

  complementos: Array<complemento> = [];
  seleccionForm: FormGroup;
  seleccionSolucionForm: DireccionForm;
  invalidForm: boolean = false;
  cadena_direccion: string = '';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DireccionForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  obtenerDireccion() {
    let cadena = '';
    Object.keys(this.seleccionForm.controls).forEach((key: string) => {
      let control = this.seleccionForm.get(key);
      if (control != null)
        if (!(control instanceof FormArray))
          cadena += control.value.text == null ? control.value + ' ' : control.value.text + ' ';
    });
    for (let c of this.complementos)
      cadena += ` ${c.tipo} ${c.descripcion} `
    return cadena.replace(/  +/g, ' ');
  }

  enviarDireccion() {
    if (this.seleccionSolucionForm.isValid())
      this.messageEvent.emit(this.obtenerDireccion());
    else {
      this.invalidForm = true;
      this.scrollAlControlInvalido_modal();
      return;
    }
  }

  agregarComplemento() {
    this.complementos.push({ tipo: this.seleccionForm.controls.tipo_complemento.value.text, descripcion: this.seleccionForm.controls.descripcion_complemento.value });
    this.limpiarControl('tipo_complemento');
    this.limpiarControl('descripcion_complemento');
  }

  limpiarControl(nombre:string){
    this.seleccionForm.controls[nombre].setValue('');
  }

  cancelar() {
    this.messageEvent.emit('%&/$');
  }

  habilitarControlesXpais() {
    if (this.seleccionForm.controls.pais.value.text === 'Colombia') {
      this.seleccionForm.controls['municipio'].enable();
      this.seleccionForm.controls['departamento'].enable();
    }
    else {
      this.seleccionForm.controls['municipio'].disable();
      this.seleccionForm.controls['departamento'].disable();
    }
  }

  EliminarComplemento(fila) {
    const index = this.complementos.indexOf(fila);
    this.complementos.splice(index, 1);
  }

  scrollAlControlInvalido_modal() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      ".ng-invalid");
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}
