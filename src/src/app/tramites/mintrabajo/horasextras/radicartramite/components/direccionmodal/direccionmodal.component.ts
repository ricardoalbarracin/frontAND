import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { send } from 'process';

@Component({
  selector: 'app-direccionmodal',
  templateUrl: './direccionmodal.component.html',
  styleUrls: ['./direccionmodal.component.scss']
})
export class DireccionmodalComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sendMessage(message:string){
    this.messageEvent.emit(message);
  }

  receiveMessage($event){
    this.sendMessage($event);
  }

}
