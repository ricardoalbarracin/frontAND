import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosDenuncianteForm } from './datos-denunciante-form';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';
import { responseService, requestUsuarioxID } from '../../models/sic-models';

@Component({
  selector: 'app-datos-denunciante',
  templateUrl: './datos-denunciante.component.html',
  styleUrls: ['./datos-denunciante.component.scss']
})
export class DatosDenuncianteComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosDenuncianteForm;
  responsePersona: responseService;
  usuarioId: requestUsuarioxID;
  tipo: string;
  celular: string;
  pais: string;
  region: string;
  ciudad: string;
  correo: string;

  listaTipoDocumento: any = [];
  listaPais: any = [];
  listaDepartamento: any = [];
  listaCiudad: any = [];
  invalidForm: any;

  constructor(private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosDenuncianteForm();
    this.buildForm();
    this.consultarPersona();
  }

  ngAfterContentChecked() {
    // obtener el tipo de documento
    for (const item of this.listaTipoDocumento) {
      if (item.value == this.responsePersona.persona.tipoDocumento) {
        this.tipo = item.text;
        break;
      }
    }

    // obtener el pais
    for (const item of this.listaPais) {
      if (item.value == this.responsePersona.persona.direcciones[0].codigoPais) {
        this.pais = item.text;
        break;
      }
    }

    // obtener el departamento
    for (const item of this.listaDepartamento) {
      if (item.value == this.responsePersona.persona.direcciones[0].codigoRegion) {
        this.region = item.text;
        break;
      }
    }
    // obtener la ciudad
    for (const item of this.listaCiudad) {
      if (item.value == this.responsePersona.persona.direcciones[0].codigoCiudad) {
        this.ciudad = item.text;
        break;
      }
    }

    if (this.responsePersona.persona.direcciones[0].telefonos.length > 0) {
      this.celular = this.responsePersona.persona.direcciones[0].telefonos[0].numero;
    }

    if (this.responsePersona.persona.emails.length > 0) {
      this.correo = this.responsePersona.persona.emails[0].descripcion;
    }
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  accion_continuar() {
    this.router.navigate(['/sic/datos_denuncio']);
  }

  consultarPersona() {
    this.usuarioId = {
      id: sessionStorage.getItem('user')
    };
    this.sicUtils.postConsultarPersona(this.usuarioId).subscribe(
      // Success response
      response => {
        this.responsePersona = response;

        this.cargarListasGenericas();
        this.cargarListaCiudad(this.responsePersona.persona.direcciones[0].codigoRegion);
        this.cargarListaDepartamento(this.responsePersona.persona.direcciones[0].codigoPais);
      },
      // Failure response
      error => {
        console.error(error);
      },
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

  cargarListaDepartamento(value: string) {
    this.sicUtils.getListaRegion(value)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaDepartamento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  cargarListaCiudad(value: number) {
    this.sicUtils.getListaCiudad(String(value))
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaCiudad = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

}
