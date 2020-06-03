/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DatosDenunciadoPersonaNaturalForm } from './datos-denunciado-persona-natural-form';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';
import { DenunciadoEmpresa, DireccionesEntity,
  EmailsEntity, TelefonosEntity, Denunciado,
  RepresentanteDenunciado, NaturalApoderado } from '../../models/sic-models';

@Component({
  selector: 'app-datos-denunciado-persona-natural',
  templateUrl: './datos-denunciado-persona-natural.component.html',
  styleUrls: ['./datos-denunciado-persona-natural.component.scss']
})
export class DatosDenunciadoPersonaNaturalComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosDenunciadoPersonaNaturalForm;
  invalidForm = false;
  listaTipoDocumento: any = [];
  listaPais: any = [];
  listaDepartamento: any = [];
  listaCiudad: any = [];
  natural: NaturalApoderado;
  denunciado: Denunciado;
  denunciadoEmpresa: DenunciadoEmpresa;
  representanteLegal: RepresentanteDenunciado;
  direcciones: DireccionesEntity[];
  mail: EmailsEntity[];
  telefono: TelefonosEntity[];

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosDenunciadoPersonaNaturalForm();
    this.buildForm();
    this.cargarListasGenericas();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.seleccionForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.error(name);
      }
    }
    return invalid;
  }


  accion_continuar() {
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid()) {
      this.registrarPersona();
    } else {
      this.invalidForm = true;
      return;
    }
  }

  setValidator() {
    if (this.seleccionForm.value.tipo_documento.value === 'PA') {
      this.seleccionForm.get('numero_documento').setValidators([Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$')]);
      this.seleccionForm.get('numero_documento').updateValueAndValidity();
    } else {
      this.seleccionForm.controls['numero_documento'].setValidators([Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[0-9]+$')]);
      this.seleccionForm.controls['numero_documento'].updateValueAndValidity();
    }
  }

  accion_anterior() {
    this.router.navigate(['/sic/datos_denunciante']);
  }

  cargarListaDepartamento() {
    this.seleccionForm.controls['departamento'].reset();
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
    this.seleccionForm.controls['ciudad'].reset();
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

  registrarPersona() {
    this.denunciadoEmpresa = {
      descripcion: '',
      digitoVerificacion: '',
      razonsocial: ''
    };
    this.mail = [{
      tipo: 'PE',
      descripcion: this.seleccionForm.value.correo
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
      primerApellido: this.seleccionForm.value.primer_apellido,
      primerNombre: this.seleccionForm.value.primer_nombre,
      segundoApellido: this.seleccionForm.value.segundo_apellido,
      segundoNombre: this.seleccionForm.value.segundo_nombre
    };
    this.representanteLegal = {
      id: '0',
      direcciones: this.direcciones,
      emails: this.mail,
      natural: this.natural ,
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: this.seleccionForm.value.tipo_documento.value,
      tipoPersona: 'NA',

    }
    this.denunciado = {
      id: '0',
      empresa: this.denunciadoEmpresa,
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: this.seleccionForm.value.tipo_documento.value,
      tipoPersona: 'NA',
      emails: this.mail,
      direcciones: this.direcciones,
      representanteLegal: this.representanteLegal,
    };
    sessionStorage.setItem('Denunciado', JSON.stringify(this.denunciado));
    this.router.navigate(['/sic/conducta_alerta']);
  }
}
