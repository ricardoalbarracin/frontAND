import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import { dialogModal } from '@shared/dialog-modal/models/dialogModal';
import jsonStrings from '@stringResources/app-strings.json';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-btn-volver',
  templateUrl: './btn-volver.component.html',
  styleUrls: ['./btn-volver.component.scss']
})
export class BtnVolverComponent implements OnInit {

  @Input() tramite: string;
  @Input() type: string;
  title: string;

  constructor(
    private route: Router,
    private dialog: ConfirmModalService
  ) { }

  ngOnInit() {
    this.title = jsonStrings.messages["back-to-home"].title

  }

  click() {
    if (this.tramite != ""){
      let options: dialogModal[] = [
        {
          name: jsonStrings.messages["back-to-home"]["option-keep"],
          value: false,
          styleClass: "btn-middle",
          event: () => {}
        },{
          name: jsonStrings.messages["back-to-home"]["option-go-back"],
          value: true,
          styleClass: "btn-high",
          event: this.redirect
        }
      ]

      this.dialog.openDialogCustom(
        jsonStrings.messages["back-to-home"].title,
        jsonStrings.messages["back-to-home"]["modal-message"],
        options,
        "go-back",
        false,
        "lg"
      );

    }
  }

  redirect = () => {
    if (this.type == "redirect"){
      window.location.href = environment.fichaTramiteUrlBase + this.tramite;
    }
    else{
      this.route.navigate([this.tramite]);
    }
  }
}
