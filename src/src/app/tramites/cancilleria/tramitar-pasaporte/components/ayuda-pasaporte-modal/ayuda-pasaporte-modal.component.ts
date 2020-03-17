import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ayuda-pasaporte-modal',
  templateUrl: './ayuda-pasaporte-modal.component.html',
  styleUrls: ['./ayuda-pasaporte-modal.component.scss']
})
export class AyudaPasaporteModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close();
  }
}