import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NotificationActionModel } from '@shared/notifications/models/notificationAction.model';

@Component({
  selector: 'app-logout-icbf',
  templateUrl: './logout-icbf.component.html',
  styleUrls: ['./logout-icbf.component.scss']
})
export class LogoutIcbfComponent implements OnInit {

  currentUserIcbf: any;
  actions: NotificationActionModel[] = [];

  constructor( private userService: UserService, private router: Router) {
    this.currentUserIcbf = this.userService.getUserLoggedIn();
    this.actions.push({
      class: 'btn btn-round btn-high col-12',
      event: this.logout,
      title: 'Cerrar sesión'
    });
    console.log(this.currentUserIcbf);
   }

  ngOnInit() {

  }

  logout = () => {
    this.userService.userLoggedOut();
    this.router.navigate(['/servicios-y-tramites/ICBF/expedicion-estado-cuenta-aportes-parafiscales/T7760']);

  }

}
