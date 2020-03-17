import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-puntos-atencion-modal',
  templateUrl: './puntos-atencion-modal.component.html',
  styleUrls: ['./puntos-atencion-modal.component.scss']
})
export class PuntosAtencionComponent implements OnInit {

  @Input() puntosAtencion:string;
  @Input() normatividad:string;
  p: number = 1;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  closeModal(){
    this.activeModal.close();
  }

}
