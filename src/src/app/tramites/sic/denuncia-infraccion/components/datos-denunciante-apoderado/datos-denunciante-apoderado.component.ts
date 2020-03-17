import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DatosDenuncianteApoderadoForm } from './datos-denunciante-apoderado-form'
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service'

@Component({
  selector: 'app-datos-denunciante-apoderado',
  templateUrl: './datos-denunciante-apoderado.component.html',
  styleUrls: ['./datos-denunciante-apoderado.component.scss']
})
export class DatosDenuncianteApoderadoComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosDenuncianteApoderadoForm;
  invalidForm = false;
  listaTipoDocumento: any = [];
  listaPais: any = [];
  listaDepartamento: any = [];
  listaCiudad: any = [];

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosDenuncianteApoderadoForm();
    this.buildForm();
    this.cargarListasGenericas();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  accion_continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/datos_denuncio']);
    }
    else {
      this.invalidForm = true;
      return;
    }
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

  cargarListaDepartamento() {
    this.seleccionForm.controls["departamento"].reset();
    this.sicUtils.getListaRegion(this.seleccionForm.value.pais.value)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaDepartamento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  cargarListaCiudad() {
    this.seleccionForm.controls["ciudad"].reset();
    this.sicUtils.getListaCiudad(this.seleccionForm.value.departamento.value)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaCiudad = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
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

    //Pais
    this.sicUtils.getListaGenericas("PAIS")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaPais = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

}
