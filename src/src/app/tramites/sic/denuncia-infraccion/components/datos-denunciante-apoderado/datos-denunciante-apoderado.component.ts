import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DatosDenuncianteApoderadoForm } from './datos-denunciante-apoderado-form';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';
import {  DireccionesEntity, EmailsEntity, TelefonosEntity, NaturalApoderado, Apoderado } from '../../models/sic-models';

@Component({
  selector: 'app-datos-denunciante-apoderado',
  templateUrl: './datos-denunciante-apoderado.component.html',
  styleUrls: ['./datos-denunciante-apoderado.component.scss']
})
export class DatosDenuncianteApoderadoComponent implements OnInit {
  naturalApoderado: NaturalApoderado;
  direcciones: DireccionesEntity[];
  mail: EmailsEntity[];
  apoderado: Apoderado;
  telefono: TelefonosEntity[];
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
    this.naturalApoderado = {
      primerApellido: this.seleccionForm.value.primer_apellido,
      primerNombre: this.seleccionForm.value.primer_nombre,
      segundoApellido: this.seleccionForm.value.segundo_apellido,
      segundoNombre: this.seleccionForm.value.segundo_nombre
    };
    this.mail = [{
      tipo: 'PE',
      descripcion: this.seleccionForm.value.correo
    }];
    this.telefono = [{
      tipo: 'CE',
      numero: this.seleccionForm.value.telefono_celular
    }
    ];
    this.direcciones = [{
      codigoPais: this.seleccionForm.value.pais.value,
      tipo: 'PE',
      descripcion: this.seleccionForm.value.direccion,
      codigoCiudad: this.seleccionForm.value.ciudad.value,
      codigoRegion: this.seleccionForm.value.departamento.value,
      telefonos: this.telefono
    }];
    this.apoderado = {
      id: '0',
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: this.seleccionForm.value.tipo_documento.value,
      tipoPersona: 'NA',
      natural: this.naturalApoderado,
      emails: this.mail,
      direcciones: this.direcciones ,
    };
    sessionStorage.setItem('Apoderado', JSON.stringify(this.apoderado));
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/datos_denuncio']);
    } else {
      this.invalidForm = true;
      return;
    }
  }
  setValidator() {
    if (this.seleccionForm.value.tipo_documento.value == 'PA') {
      this.seleccionForm.get('numero_documento').setValidators([Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$')]);
      this.seleccionForm.get('numero_documento').updateValueAndValidity();
    } else {
      this.seleccionForm.controls.numero_documento.setValidators([Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[0-9]+$')]);
      this.seleccionForm.controls.numero_documento.updateValueAndValidity();
    }
  }

  cargarListaDepartamento() {
    this.seleccionForm.controls.departamento.reset();
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
    this.seleccionForm.controls.ciudad.reset();
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
    // Tipo de documento
    this.sicUtils.getListaGenericas('TIPO_DOCUMENTO_PERSONA')
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaTipoDocumento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
    // Pais
    this.sicUtils.getListaGenericas('PAIS')
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
