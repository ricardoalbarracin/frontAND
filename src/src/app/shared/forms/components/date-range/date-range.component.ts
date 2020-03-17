import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

  @Output() selectEvent: EventEmitter<any> = new EventEmitter();
  public from: Date;
  public to: Date;

  btnClass = {
    default: 'btn btn-round btn-middle form-control',
    selected: 'btn btn-round btn-high form-control'
  };

  constructor( private activeModal: NgbActiveModal) { }

  // Función para el cierre del modal
  closeModal() { this.activeModal.close(); }

  // Función 
  consultar() {
      this.selectEvent.emit({from: this.from, to: this.to});
      this.activeModal.close();
  }

}
