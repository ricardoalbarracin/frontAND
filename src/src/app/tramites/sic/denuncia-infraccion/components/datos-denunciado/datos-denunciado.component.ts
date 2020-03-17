import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosDenunciadoForm } from './datos-denunciado-form'

@Component({
  selector: 'app-datos-denunciado',
  templateUrl: './datos-denunciado.component.html',
  styleUrls: ['./datos-denunciado.component.scss']
})
export class DatosDenunciadoComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm : DatosDenunciadoForm;
  listaTipoPersona:any;

  constructor() { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosDenunciadoForm();
    this.buildForm();
    this.llenarListaTipoPersona();
  }
  
  llenarListaTipoPersona(){    
    this.listaTipoPersona = [
      {value:'1',text:'Natural'},
      {value:'2',text:'Juridica'}
    ]
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();    
  }

}
