import { Component, OnInit } from '@angular/core';
import jsonStrings from '@stringResources/tramites/tramitar-pasaporte.json'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TramitarPasaporteService } from '../../services/tramitar-pasaporte.service';

@Component({
  selector: 'app-aviso-privacidad-modal',
  templateUrl: './aviso-privacidad-modal.component.html',
  styleUrls: ['./aviso-privacidad-modal.component.scss']
})
export class AvisoPrivacidadModalComponent implements OnInit {

  messages: {
    title: "",
    text: ""
  };

  constructor(private tramiteService: TramitarPasaporteService, private activeModal: NgbActiveModal) {
    this.getParams();
  }

  ngOnInit() {
  }

  getParams() {
    this.getTratamientoDatos();
  }

  closeModal() {
    this.activeModal.close();
  }

  getTratamientoDatos(): void {
    this.tramiteService.getTratamientoDatos().subscribe((data: any[]) => {
      if (data != undefined) {
        this.messages = {
          title: data["return"].tratamientoDatosPersonalesTitulo,
          text: data["return"].tratamientoDatosPersonalesCuerpo
        }
      }
    }, (error) => {
      console.error(error);
    });
  }
}