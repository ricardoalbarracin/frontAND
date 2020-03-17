import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terminos-modal',
  templateUrl: './terminos-modal.component.html',
  styleUrls: ['./terminos-modal.component.scss']
})
export class TerminosModalComponent implements OnInit {

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
