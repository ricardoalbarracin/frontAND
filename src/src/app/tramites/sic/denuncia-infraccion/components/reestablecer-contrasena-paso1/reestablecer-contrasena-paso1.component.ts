import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ReestablecerContrasenaPaso1Form } from './reestablecer-contrasena-paso1-form'
import { SicUtilsService } from '../../services/sic-utils.service'
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';

@Component({
  selector: 'app-reestablecer-contrasena-paso1',
  templateUrl: './reestablecer-contrasena-paso1.component.html',
  styleUrls: ['./reestablecer-contrasena-paso1.component.scss']
})
export class ReestablecerContrasenaPaso1Component implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: ReestablecerContrasenaPaso1Form;
  invalidForm: boolean = false;
  listaTipoDocumento: any = [];
  mensajeEnviado = false;
  messages: any;

  constructor(private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new ReestablecerContrasenaPaso1Form();
    this.buildForm();
    this.cargarListasGenericas();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  setValidator() {
    if (this.seleccionForm.value.tipo_documento.value == 'PA') {
      this.seleccionForm.get('numero_documento').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$')])
      this.seleccionForm.get('numero_documento').updateValueAndValidity();
    }
    else {
      this.seleccionForm.controls['numero_documento'].setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('^[0-9]+$')])
      this.seleccionForm.controls['numero_documento'].updateValueAndValidity();
    }
  }


  enviar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.messages = {
        warning_envio_exitoso: jsonStrings.messages.warning_envio_exitoso.split('%').join(this.seleccionForm.value.correo)
      };
      this.mensajeEnviado = true;
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  cargarListasGenericas() {
    //Tipo de documento
    this.sicUtils.getListaGenericas("TIPO_DOCUMENTO_PERSONA")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaTipoDocumento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

}
