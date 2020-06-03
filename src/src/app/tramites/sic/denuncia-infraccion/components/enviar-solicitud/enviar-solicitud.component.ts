import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router';
import {Radicacion, Radicador, responseService} from '../../models/sic-models';
import { SicUtilsService } from '../../services/sic-utils.service';

@Component({
  selector: 'app-enviar-solicitud',
  templateUrl: './enviar-solicitud.component.html',
  styleUrls: ['./enviar-solicitud.component.scss']
})
export class EnviarSolicitudComponent implements OnInit {
  radicacion: Radicacion;
  radicadorUser: Radicador;
  constructor(private router: Router, private modalAlertService: ConfirmModalService, private sicUtils: SicUtilsService ) { }

  ngOnInit() {
    this.modalAlertService.openDialogCustom(
      'Enviar solicitud',
      jsonStrings.messages.warning_enviar_solicitud,
      [{
        name: 'No, aun no.',
        value: true,
        styleClass: 'btn-middle',
        event: () => {
          this.router.navigate(['/sic/adjunta_documento']);
        }
      },
        {
        name: 'Si, Enviar',
        value: false,
        styleClass: 'btn-high',
        event: () => {
          this.registrarDenuncia();
        }
      }
    ],
    'warning',
    );
  }
  registrarDenuncia() {
    this.radicadorUser = {
      id: sessionStorage.getItem('user'),
    }
    this.radicacion = {
        radicador: this.radicadorUser,
        apoderado: JSON.parse(sessionStorage.getItem('Apoderado')),
        denunciado: JSON.parse(sessionStorage.getItem('Denunciado')),
        codigosTipoAlerta: JSON.parse(sessionStorage.getItem('codigosTipoAlerta')),
        adjuntos: JSON.parse(sessionStorage.getItem('adjuntos')),
        hechos: JSON.parse(sessionStorage.getItem('hechos')),
        observaciones: sessionStorage.getItem('observacion'),
      };
    console.log(this.radicacion);
    sessionStorage.setItem('DenunciaFinal', JSON.stringify(this.radicacion));

    this.sicUtils.postRegistrarRadicacion(this.radicacion)
      .subscribe((data: responseService) => {
          if (data.radicacion != null) {
            this.OpenModalSuccess();
            console.log(data);
          } else {
            console.log(data);
            this.OpenModalError();
            return;
          }
        }, (error) => {
          console.log(error);
        }
      );
  }
  OpenModalSuccess() {
    this.modalAlertService.openDialogCustom(
      'Proceso Exitoso',
      'La denuncia fue radicada con éxito',
      [{
        name: 'ACEPTAR',
        value: true,
        styleClass: 'btn-middle',
        event: () => {
          this.router.navigate(['/sic']);
        }
      }
      ], 'success');
  }
  OpenModalError() {
    this.modalAlertService.openDialogCustom(
      'Proceso Fallido',
      'La denuncia genero un error por favor volver a intentarlo',
      [{
        name: 'ACEPTAR',
        value: true,
        styleClass: 'btn-middle',
        event: () => {
          this.router.navigate(['/sic/iniciar_sesion']);
        }
      }
      ], 'error');
  }

}
