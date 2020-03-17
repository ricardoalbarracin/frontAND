import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router'

@Component({
  selector: 'app-enviar-solicitud',
  templateUrl: './enviar-solicitud.component.html',
  styleUrls: ['./enviar-solicitud.component.scss']
})
export class EnviarSolicitudComponent implements OnInit {

  constructor(private router:Router, private modalAlertService: ConfirmModalService) { }

  ngOnInit(){
    this.modalAlertService.openDialogCustom(
      'Enviar solicitud',
      jsonStrings.messages.warning_enviar_solicitud,
      [{
        name: "No, aun no.",
        value: true,
        styleClass: "btn-middle",
        event: () => {
          this.router.navigate(['/sic/adjunta_documento']);
        }
      },
        {
        name: "Si, Enviar",
        value: true,
        styleClass: "btn-high",
        event: () => {
          this.router.navigate(['/sic']);
        }
      }
    ],
    'warning',
    );
  }

}
