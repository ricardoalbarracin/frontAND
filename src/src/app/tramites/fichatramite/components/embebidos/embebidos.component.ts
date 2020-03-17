import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTramiteService } from '../../services/ficha-tramite.service'
import { GeneralComponent } from '../general/general.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RecursosModalComponent} from '../recursos-modal/recursos-modal.component'


@Component({
  selector: 'embebidos',
  templateUrl: './embebidos.component.html',
  styleUrls: ['./embebidos.component.scss']
})
export class EmbebidosComponent implements AfterViewInit {
  @Input('data') data: number;
  constructor(public sanitizer: DomSanitizer, private modalService: NgbModal) {  }


  ngAfterViewInit() {

  }
  showModal(id) {
   const modal = this.modalService.open(RecursosModalComponent, { size: 'lg',
      backdrop: "static",
      keyboard: false
    });
    modal.componentInstance.idTramite = id;
  }

  ngAfterViewChecked(){
    this.setNumeroTramite(this.data["NUMERO"]);
  }
  setNumeroTramite(numero: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    if(s.length > 0){
      s[0].setAttribute('itemid', "T"+numero);
    }
  }



}

