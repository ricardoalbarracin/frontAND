import { Component, OnInit } from '@angular/core';
import jsonStrings from '@stringResources/tramites/consultorios-juridicos.json'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-minjusticia-terminos',
  templateUrl: './registro-minjusticia-terminos.component.html',
  styleUrls: ['./registro-minjusticia-terminos.component.scss']
})
export class RegistroMinjusticiaTerminosComponent implements OnInit {

  messages: any;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.messages = {
      title: jsonStrings.messages["registro-minjusticia-terminos"].title,
      text: jsonStrings.messages["registro-minjusticia-terminos"].text,
    }
  }

  closeModal(){
    this.activeModal.close();
  }

}
