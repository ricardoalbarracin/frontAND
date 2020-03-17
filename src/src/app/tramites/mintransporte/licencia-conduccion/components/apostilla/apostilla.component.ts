import { Component, OnInit } from '@angular/core';
import jsonData from '@stringResources/tramites/mintransporte-solicitar-certificado.json';

@Component({
  selector: 'app-apostilla',
  templateUrl: './apostilla.component.html',
  styleUrls: ['./apostilla.component.scss']
})
export class ApostillaComponent implements OnInit {

  messages: any;

  constructor() { }

  ngOnInit() {
    this.getMessages();
  }  

  getMessages(): void {
    this.messages = {
      apostillaMessage: jsonData.messages["apostilla-message"],
      apostillaButton: jsonData.messages["apostilla-message-button"],
      cancilleriaUrl: jsonData.messages["cancilleria-url"]
    }
  }

}
