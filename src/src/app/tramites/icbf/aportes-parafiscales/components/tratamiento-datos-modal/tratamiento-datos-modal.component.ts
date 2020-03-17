import { Component, OnInit, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tratamiento-datos-modal',
  templateUrl: './tratamiento-datos-modal.component.html',
  styleUrls: ['./tratamiento-datos-modal.component.scss']
})
export class TratamientoDatosModalComponent implements OnInit {

  @Input() name: string;
  @Input() enlace: string;

  constructor(public modalService: NgbModal) { }

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  close() {
    this.modalService.dismissAll();
  }

}
