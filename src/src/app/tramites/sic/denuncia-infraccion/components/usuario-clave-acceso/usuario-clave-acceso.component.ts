import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioClaveAccesoForm } from './usuario-clave-acceso-form'
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router'
import { requestRegistrarUsuario, responseRegistrarUsuario, responseService } from '../../models/sic-models';
import { SicUtilsService } from '../../services/sic-utils.service';

@Component({
  selector: 'app-usuario-clave-acceso',
  templateUrl: './usuario-clave-acceso.component.html',
  styleUrls: ['./usuario-clave-acceso.component.scss']
})
export class UsuarioClaveAccesoComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm: UsuarioClaveAccesoForm;
  invalidForm: boolean = false;
  reqUsuario: requestRegistrarUsuario;

  constructor(private modalAlertService: ConfirmModalService, private router: Router, private sicUtils: SicUtilsService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new UsuarioClaveAccesoForm();
    this.buildForm();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  lanzarModal() {
    this.modalAlertService.openDialogCustom(
      'Confirmación de correo',
      jsonStrings.messages.warning_confirma_correo + sessionStorage.getItem('correo') + "?",
      [{
        name: "CANCELAR",
        value: true,
        styleClass: "btn-middle",
        event: () => {
          this.router.navigate(['/sic/datos_persona_natural']);
        }
      },
      {
        name: "CONTINUAR",
        value: true,
        styleClass: "btn-high",
        event: () => {
          this.registrarUsuario();
        }
      }
      ],
      'warning',
    );
  }

  validarPasswords(): boolean {
    return this.seleccionForm.value.paasword === this.seleccionForm.value.repetir_password;
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

  registrarUsuario() {
    this.reqUsuario = {
      id: sessionStorage.getItem('idPersona'),
      login: this.seleccionForm.value.nombre,
      password: this.seleccionForm.value.paasword,
      sistema: "RC",
      codigoRol: "1"
    }
    this.sicUtils.postRegistrarUsuario(this.reqUsuario)
      .subscribe((data: responseRegistrarUsuario) => {
        if (data.codigo == '0') {
          this.modal_enviar_mensaje();
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

  finalizar_registro() {
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid() && this.validarPasswords()) {
      this.lanzarModal();
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  modal_enviar_mensaje() {
    this.modalAlertService.openDialogCustom(
      'Envio exitoso',
      jsonStrings.messages.succesfull_envio_correo + sessionStorage.getItem('correo'),
      [{
        name: "ACEPTAR",
        value: true,
        styleClass: "btn-high",
        event: () => {
          this.router.navigate(['/sic']);
        }
      }
      ],
      'success',
    );
  }

  anterior() {
    this.router.navigate(['/sic/datos_persona_natural']);
  }

}
