import { Component, OnInit } from '@angular/core';
import { DatosDenunciadoPersonaJuridicaForm } from './datos-denunciado-persona-juridica-form'
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { SicUtilsService } from '../../services/sic-utils.service'
import { Persona, Natural, DireccionesEntity, EmailsEntity, TelefonosEntity, responseService, Empresa } from '../../models/sic-models'

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
  telefono: TelefonosEntity[];

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
      this.registrarPersona();
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  accion_anterior() {
    this.router.navigate(['/sic/datos_denunciante']);
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


  registrarPersona() {
    this.mail = []
    this.telefono = [];

    this.natural = {
      saludo: "ES",
      primerNombre: this.seleccionForm.value.primer_nombre_apoderado,
      segundoNombre: this.seleccionForm.value.segundo_nombre_apoderado,
      primerApellido: this.seleccionForm.value.primer_apellido_apoderado,
      segundoApellido: this.seleccionForm.value.segundo_apellido_apoderado
    }

    this.empresa = {
      razonsocial: this.seleccionForm.value.razonsocial
    }

    if (this.seleccionForm.value.correo_apoderado.length > 0)
      this.mail.push({ tipo: "PE", descripcion: this.seleccionForm.value.correo_apoderado });
    if (this.seleccionForm.value.correo.length > 0)
      this.mail.push({ tipo: "PE", descripcion: this.seleccionForm.value.correo });
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
      empresa: this.empresa,
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
