import { Component, OnInit,Input, OnChanges, AfterViewChecked } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recursos-modal',
  templateUrl: './recursos-modal.component.html',
  styleUrls: ['./recursos-modal.component.scss']
})
export class RecursosModalComponent implements AfterViewChecked {

  @Input() idTramite:string;

  constructor(private activeModal: NgbActiveModal) { }


  ngAfterViewChecked(){
    this.setNumeroTramite(this.idTramite);
  }
  setNumeroTramite(numero: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    if(s.length > 0){
      s[0].setAttribute('module-id', numero);
    }
  }


  closeModal(){
    this.activeModal.close();
  }

}
