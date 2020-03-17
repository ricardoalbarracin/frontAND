import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NotificationActionModel } from '@shared/notifications/models/notificationAction.model';

@Component({
  selector: 'app-notification-action',
  templateUrl: './notification-action.component.html',
  styleUrls: ['./notification-action.component.scss']
})
export class NotificationActionComponent implements OnInit, OnChanges {

  @Input() typeMessage: string;
  @Input() message: string;
  @Input() title: string;
  @Input() positionAction: string;
  @Input() show: boolean;
  @Input() showClose: boolean;
  @Input() actions: NotificationActionModel[];

  public toast: any;
  public desingAction: any = {};
  ngOnInit() {}

  ngOnChanges() {
    this.toast = {
      iconClass: 'bd-highlight govco-icon ',
      class: 'toast pb-3 pt-3 '
    };
    this.desingAction = {
      contentClass: 'col-12',
      actionClass: ''
    };
    const classToast = this.getTypeToast(this.typeMessage);
    this.toast.iconClass += classToast.iconClass;
    this.toast.class += classToast.contentClass;
    if (this.positionAction === 'left') {
      this.desingAction.contentClass = 'col-lg-8 col-md-12 col-sm-12 pr-0';
      this.desingAction.actionClass = 'col-lg-4 col-md-6 col-sm-6 mx-auto';
    } else if (this.positionAction === 'bottom') {
      this.desingAction.contentClass = 'col-12 ';
      this.desingAction.actionClass = 'col-12 d-flex justify-content-center';
    }
  }

  private getTypeToast(typeMessage): any {
    const toastClass = {contentClass: '', iconClass: ''};
    switch (typeMessage) {
      case 'info':
        toastClass.contentClass = 'toast-info';
        toastClass.iconClass = 'govco-icon-bell-sound-p color-marine';
        break;
      case 'success':
        toastClass.contentClass = 'toast-success';
        toastClass.iconClass = 'govco-icon-check-cn color-green';
        break;
      case 'error':
        toastClass.contentClass = 'toast-error';
        toastClass.iconClass = 'govco-icon-sad-face-n color-shiraz';
        break;
      case 'warning':
        toastClass.contentClass = 'toast-warning';
        toastClass.iconClass = 'govco-icon-exclamation-cn color-gold';
        break;
      default:
        toastClass.contentClass = 'toast-info';
        toastClass.iconClass = 'govco-icon-bell-sound color-marine';
        break;
    }
    return toastClass;
  }

}
