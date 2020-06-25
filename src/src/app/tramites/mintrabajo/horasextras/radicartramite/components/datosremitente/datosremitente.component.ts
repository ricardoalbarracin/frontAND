import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosRemitenteForm } from './datosremitente.form';


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

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosRemitenteForm;
  invalidForm: boolean = false;

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosRemitenteForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

}
