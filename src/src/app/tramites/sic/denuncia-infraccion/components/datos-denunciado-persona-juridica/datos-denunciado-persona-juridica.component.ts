import { Component, OnInit } from '@angular/core';
import { DatosDenunciadoPersonaJuridicaForm } from './datos-denunciado-persona-juridica-form';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { SicUtilsService } from '../../services/sic-utils.service';
import {
  Persona,
  Natural,
  DireccionesEntity,
  EmailsEntity,
  TelefonosEntity,
  responseService,
  Empresa,
  DenunciadoEmpresa,
  Denunciado,
  RepresentanteDenunciado,
  NaturalApoderado
} from '../../models/sic-models';

@Component({
  selector: 'app-datos-denunciado-persona-juridica',
  templateUrl: './datos-denunciado-persona-juridica.component.html',
  styleUrls: ['./datos-denunciado-persona-juridica.component.scss']
})
export class DatosDenunciadoPersonaJuridicaComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosDenunciadoPersonaJuridicaForm;
  invalidForm = false;
  listaTipoDocumento: any = [];
  listaPais: any = [];
  listaDepartamento: any = [];
  listaCiudad: any = [];
  persona: Persona;
  natural: Natural;
  empresa: Empresa;
  direcciones: DireccionesEntity[];
  mail: EmailsEntity[];
  mailRepresentante: EmailsEntity[];
  telefono: TelefonosEntity[];
  denunciado: Denunciado;
  denunciadoEmpresa: DenunciadoEmpresa;
  representanteLegal: RepresentanteDenunciado;

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosDenunciadoPersonaJuridicaForm();
    this.buildForm();
    this.cargarListasGenericas();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  accion_continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.registrarPersonaJuridica();
    } else {
      this.invalidForm = true;
      return;
    }
  }

  accion_anterior() {
    this.router.navigate(['/sic/datos_denunciante']);
  }

  setValidator() {
    // tslint:disable-next-line:triple-equals
    if (this.seleccionForm.value.tipo_documento.value == 'PA') {
      this.seleccionForm.get('numero_documento').setValidators([
        Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$')]);
      this.seleccionForm.get('numero_documento').updateValueAndValidity();
    } else {
      this.seleccionForm.controls.numero_documento.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]+$')
    ]);
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

  registrarPersonaJuridica() {
    this.denunciadoEmpresa = {
      descripcion: '',
      digitoVerificacion: '',
      razonsocial:  this.seleccionForm.value.razon_social,
    };
    this.mail = [{
      tipo: 'PE',
      descripcion: this.seleccionForm.value.correo
    }];
    this.mailRepresentante = [{
      tipo: 'PE',
      descripcion: this.seleccionForm.value.correo_apoderado
    }];
    this.telefono = [{
      tipo: 'CE',
      numero: this.seleccionForm.value.celular
    },
      {
        tipo: 'FI',
        numero: this.seleccionForm.value.telefono_fijo
      },
      {
        tipo: 'FX',
        numero: this.seleccionForm.value.fax
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
    this.natural = {
      primerApellido: this.seleccionForm.value.primer_apellido_apoderado,
      primerNombre: this.seleccionForm.value.primer_nombre_apoderado,
      segundoApellido: this.seleccionForm.value.segundo_apellido_apoderado,
      segundoNombre: this.seleccionForm.value.segundo_nombre_apoderado
    };
    this.representanteLegal = {
      id: '0',
      direcciones: null,
      emails: this.mailRepresentante,
      natural: this.natural ,
      numeroDocumento: this.seleccionForm.value.numero_documento_apoderado,
      tipoDocumento: this.seleccionForm.value.tipo_documento_apoderado.value,
      tipoPersona: 'NA',

    }
    this.denunciado = {
      id: '0',
      empresa: this.denunciadoEmpresa,
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: this.seleccionForm.value.tipo_documento.value,
      tipoPersona: 'EM',
      emails: this.mail,
      direcciones: this.direcciones,
      representanteLegal: this.representanteLegal,

    };
    sessionStorage.setItem('Denunciado', JSON.stringify(this.denunciado));
    this.router.navigate(['/sic/conducta_alerta']);

  }

}
