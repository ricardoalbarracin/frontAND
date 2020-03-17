import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { dialogModal } from '../models/dialogModal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  private windowClass : string = "alert-modal alert-govco modal-dialog-centered";
  constructor(private modalService: NgbModal) { }

  //Genera un modal de acuerdo con las opciones definidas por su implementación 
  openDialogCustom(title: string, text: string,  options: dialogModal[], type: string, showDismissButton?: boolean, sizeModal?: 'sm' | 'lg' | 'xl' ){
    let modalOpen = this.modalService.open(ConfirmModalComponent, { 
      backdrop: "static",
      keyboard: false,
      size: sizeModal,
      windowClass: this.windowClass,
      centered: true
    });
    
    modalOpen.componentInstance.setDialogInfo(title, text, type, showDismissButton, options);
  }

  //Genera un modal de notificación sin opciones adicionales a aceptar
  openNotificationDialog(title: string, text: string, type: string, okReturn: any) {
    let modalOpen = this.modalService.open(ConfirmModalComponent, { 
      backdrop: "static",
      keyboard: false,
      windowClass:  this.windowClass,
      centered: true,
      size: 'lg'
    });
    
    let options = [{
        name: "Aceptar",
        value: true,
        styleClass: "btn-middle",
        event: okReturn
      }
    ]

    modalOpen.componentInstance.setDialogInfo(title, text, type, false, options);
  }

  //Genera el modal de confirmar un proceso, ejecutando los metodos successReturn en caso de aceptar y cancelReturn en caso de cancelar
  openConfirmDialog(title: string, text: string, type: string, successReturn: any, cancelReturn: any) {
    let modalOpen = this.modalService.open(ConfirmModalComponent, { 
      backdrop: "static",
      keyboard: false,
      windowClass: this.windowClass,
      centered: true,
    });
    
    let options = [{
        name: "Aceptar",
        value: true,
        styleClass: "btn-high",
        event: successReturn
      },
      {
        name: "Cancelar",
        value: false,
        styleClass: "btn-middle",
        event: cancelReturn
      }
    ]

    modalOpen.componentInstance.setDialogInfo(title, text, type, true, options);
  }
}
