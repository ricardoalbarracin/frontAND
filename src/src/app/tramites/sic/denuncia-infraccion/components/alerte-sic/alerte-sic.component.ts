import { Component, OnInit } from '@angular/core';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Router } from '@angular/router'


@Component({
  selector: 'app-alerte-sic',
  templateUrl: './alerte-sic.component.html',
  styleUrls: ['./alerte-sic.component.scss']
})
export class AlerteSicComponent implements OnInit {

  constructor(private router:Router, private modalAlertService: ConfirmModalService) { }

  ngOnInit(){
    this.modalAlertService.openDialogCustom(
      'Alerte a la SIC',
      jsonStrings.messages.warning_inicio,
      [{
        name: "ENTENDIDO",
        value: true,
        styleClass: "btn-high",
        event: () => {
          this.router.navigate(['/sic/seleccion_solucion']);
        }
      }
    ],
    'warning',
    );
  }

}
