import { Component, OnInit, Input } from '@angular/core';
import jsonMessages from '@stringResources/tramites/consultorios-juridicos.json';
import { NotificationActionModel } from '@shared/notifications/models/notificationAction.model';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { Router } from '@angular/router';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';

@Component({
  selector: 'app-logout-minjusticia',
  templateUrl: './logout-minjusticia.component.html',
  styleUrls: ['./logout-minjusticia.component.scss']
})
export class LogoutMinjusticiaComponent implements OnInit {
  
  @Input() show: boolean;
  messages: any;
  actions: NotificationActionModel[] = [];

  constructor(
    private authService: AgendamientoAuthenticationService,
    private service: MinjusticiaUtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMessages();
    this.setActionLogout();
  }

  //Obtiene los mensajes de la notificación
  getMessages() {
    this.messages = {
      title: jsonMessages.messages.logout.title,
      message: jsonMessages.messages.logout.message
    }
  }

  //Establece las acciones y los botones de la vista
  setActionLogout() {
    this.actions.push({
      class: 'btn btn-round btn-high col-12',
      event: this.logout,
      title: 'Cerrar sesión'
    });
  }

  //Ejecuta el cierre de sesión y redirige a la vista principal de minjusticia
  logout = () => {
    const baseUrl = this.service.getTramiteUrl();

    this.authService.logOut();
    this.router.navigate([baseUrl]);
  }

}
