import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DatosDenunciadoPersonaNaturalForm } from './datos-denunciado-persona-natural-form'
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service'
import { Persona, Natural, DireccionesEntity, EmailsEntity, TelefonosEntity, responseService } from '../../models/sic-models'

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
  persona: Persona;
  natural: Natural;
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

  accion_anterior() {
    this.router.navigate(['/sic/datos_denunciante']);
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

  registrarPersona() {
    this.natural = {
      saludo: "ES",
      primerNombre: this.seleccionForm.value.primer_nombre,
      segundoNombre: this.seleccionForm.value.segundo_nombre,
      primerApellido: this.seleccionForm.value.primer_apellido,
      segundoApellido: this.seleccionForm.value.segundo_apellido
    }
    this.mail = [{
      tipo: "PE",
      descripcion: this.seleccionForm.value.correo
    }]
    this.telefono = [];
    if (this.seleccionForm.value.celular.length > 0)
      this.telefono.push({ tipo: "CE", numero: this.seleccionForm.value.celular });
    if (this.seleccionForm.value.telefono_fijo.length > 0)
      this.telefono.push({ tipo: "FI", numero: this.seleccionForm.value.telefono_fijo });
    if (this.seleccionForm.value.celular.length == 0 && this.seleccionForm.value.telefono_fijo.length == 0)
      this.telefono.push({ tipo: "FI", numero: "0" });
    this.direcciones = [{
      codigoPais: this.seleccionForm.value.pais.value,
      tipo: "EL",
      descripcion: this.seleccionForm.value.direccion,
      codigoCiudad: this.seleccionForm.value.ciudad.value,
      codigoRegion: this.seleccionForm.value.departamento.value,
      telefonos: this.telefono
    }]
    this.persona = {
      tipoPersona: "NA",
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: this.seleccionForm.value.tipo_documento.value,
      natural: this.natural,
      emails: this.mail,
      direcciones: this.direcciones
    }
    console.error(this.persona);
    this.sicUtils.postRegistrarPersona(this.persona)
      .subscribe((data: responseService) => {
        if (data.persona != null) {
          this.router.navigate(['/sic/conducta_alerta']);
        }
        else {
          console.error(data);
          return;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

}
