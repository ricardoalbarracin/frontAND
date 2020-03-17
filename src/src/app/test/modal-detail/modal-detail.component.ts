import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Detail } from '@shared/forms/services/details';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {

  @Input() public data: Detail;
  detail = [];
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {}

  dismiss() {
    this.activeModal.close();
  }
}
