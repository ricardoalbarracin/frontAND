import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router';
import { SicUtilsService } from '../../services/sic-utils.service';
import { FormGroup, Validators } from '@angular/forms';
import { RegistroNuevoUsuarioForm } from './registro-nuevo-usuario-form';
import { requestUsuarioxDocumento } from '../../models/sic-models';

@Component({
  selector: 'app-registro-nuevo-usuario',
  templateUrl: './registro-nuevo-usuario.component.html',
  styleUrls: ['./registro-nuevo-usuario.component.scss']
})
export class RegistroNuevoUsuarioComponent implements OnInit {

  showMensaje: false;
  listaTipoDocumento: any = [];
  listaTipoPersona: any = [];
  invalidForm = false;
  seleccionForm: FormGroup;
  seleccionSolucionForm: RegistroNuevoUsuarioForm;
  usuarioDocumento: requestUsuarioxDocumento;
  prueba: any;

  constructor(private modalAlertService: ConfirmModalService, private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new RegistroNuevoUsuarioForm();
    this.buildForm();
    this.cargarListasGenericas();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  setValidator() {
    if (this.seleccionForm.value.tipoDocumento.value == 'PA') {
      this.seleccionForm.get('numeroDocumento').setValidators([Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]+$')])
      this.seleccionForm.get('numeroDocumento').updateValueAndValidity();
    } else {
      this.seleccionForm.controls['numeroDocumento'].setValidators([Validators.required,
        Validators.minLength(4), Validators.maxLength(12),
        Validators.pattern('^[0-9]+$')])
      this.seleccionForm.controls['numeroDocumento'].updateValueAndValidity();
    }
  }


  cargar_modal_usuario_no_existe() {
    this.modalAlertService.openDialogCustom(
      'Sin resultados',
      jsonStrings.messages.error_modal_sin_resultados,
      [{
        name: 'CANCELAR',
        value: true,
        styleClass: 'btn-middle',
        event: () => {
          console.log('Función a ejecutar');
        }
      }, {
        name: 'ACEPTAR',
        value: true,
        styleClass: 'btn-high',
        event: () => {
          sessionStorage.setItem('tipoDocumento', this.seleccionForm.value.tipoDocumento.value)
          sessionStorage.setItem('textotipoDocumento', this.seleccionForm.value.tipoDocumento.text)
          sessionStorage.setItem('numeroDocumento', this.seleccionForm.value.numeroDocumento)
          sessionStorage.setItem('correo', this.seleccionForm.value.correo)
          sessionStorage.setItem('tipoPersona', 'NA')
          this.router.navigate(['/sic/datos_persona_natural']);
        }
      }
      ], 'error');
  }

  cargar_modal_usuario_existe() {
    this.modalAlertService.openDialogCustom(
      'Proceso inválido',
      'El usuario ya se encuentra registrado en el sistema',
      [{
        name: 'ACEPTAR',
        value: true,
        styleClass: 'btn-high',
        event: () => {
          console.log('Función a ejecutar');
        }
      }
      ], 'error');
  }

  continuar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.consultarPersona();
    } else {
      this.invalidForm = true;
      return;
    }
  }

  consultarPersona() {
    this.usuarioDocumento = {
      tipoDocumento: this.seleccionForm.value.tipoDocumento.value,
      numeroDocumento: this.seleccionForm.value.numeroDocumento
    }
    console.error('RETORNO DEL TIPODOCUMENTO ' + this.seleccionForm.value.tipoDocumento.value);
    console.error('RETORNO DEL NUMERO DOCUMENTO ' + this.seleccionForm.value.numeroDocumento);
    this.sicUtils.postConsultarPersonaXDocumento(this.usuarioDocumento).subscribe(
      response => {
        console.error('RETORNO DEL RESPONSE');
        console.error(response);
        if (!response.persona) {
          this.cargar_modal_usuario_no_existe();
        } else {
          this.cargar_modal_usuario_existe();
        }
      },
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
    this.sicUtils.getListaGenericas('TIPO_PERSONA')
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaTipoPersona = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

}

