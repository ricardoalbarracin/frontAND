import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnChanges {
  @Input() typeMessage: string;
  @Input() message: string;
  @Input() title: string;
  @Input() show: boolean;
  @Input() showButtonClose: boolean = true;
  
  public toast: any;

  public isVisible: boolean;
  public isVisibleButtonClose: boolean;
  public messageHtml: any;

  constructor(private sanitizer:DomSanitizer){ 
  }

  ngOnInit() {
    this.messageHtml = this.sanitizer.bypassSecurityTrustHtml(this.message);
  }

  ngOnChanges() {
    this.isVisible = this.show;
    this.isVisibleButtonClose = this.showButtonClose;
    this.toast = {
      iconClass: 'pr-2 bd-highlight govco-icon ',
      class: 'toast pt-3 pb-3 '
    }
    const classToast = this.getTypeToast(this.typeMessage);
    this.toast.iconClass += classToast.iconClass;
    this.toast.class += classToast.contentClass;
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

  closeNotification() : void {
    this.isVisible = false;
  }
}
