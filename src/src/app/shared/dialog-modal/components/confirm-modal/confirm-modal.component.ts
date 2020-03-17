import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { dialogModal } from '../../models/dialogModal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmModalComponent implements OnInit {
  public options: dialogModal[];
  public text: string;
  public title: string;
  public classes: any;
  public showDismiss: boolean;
  public isMaintenance: boolean;
  constructor(public activeModal: NgbActiveModal) { 
    this.classes = {
      content: 'modal-content-',
      title: ' modal-content-title content-govco ',
      iconModal: 'govco-icon ',
      btn: 'btn btn-round btn-modal '
    }
  }

  ngOnInit() {}

  public setDialogInfo(title: string, text: string, type: string, showDismiss: boolean, options?: dialogModal[]) {
    this.title = title;
    this.text = text;
    this.options = options;
    this.showDismiss = showDismiss;

    this.classes.content = this.classes.content + (type === 'go-back' ? 'error' : type);
    this.classes.title = this.classes.title + this.classes.content;
    this.isMaintenance = type === 'maintenance';
    this.setIconModal((type === 'go-back' ? 'warning' : type));
  }

  private setIconModal(type) {
    switch (type) {
      case 'error':
        this.classes.iconModal += 'govco-icon-x-cn';
        break;
      case 'warning':
        this.classes.iconModal += 'govco-icon-exclamation-cn';
        break;
      case 'success':
        this.classes.iconModal += 'govco-icon-check-cn';
        break;
      case 'info':
        this.classes.iconModal += 'govco-icon-check-cn';
        break;
      case 'maintenance':
        this.classes.iconModal += 'govco-icon-exclamation-cn';
        break;
      case 'error-site':
        this.classes.iconModal += 'govco-icon-sad-face-n';
        break;
      case 'none':
        this.classes.iconModal += '';
        break;
      default:
        this.classes.iconModal += 'govco-icon-exclamation-cn';
    }
  }

  closeModal(itemSelected: any) {
    this.activeModal.close();

    if (typeof itemSelected.event ===  'function') {
      itemSelected.event();
    }
  }

  dismiss() {
    this.activeModal.close();
  }
}
