import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-opciones',
  templateUrl: './lista-opciones.component.html',
  styleUrls: ['./lista-opciones.component.scss']
})
export class ListaOpcionesComponent implements OnInit {

  @Output() activePregunta: EventEmitter<null> = new EventEmitter();

  constructor(private location: Location) { }

  escogerOpcion() {
    this.activePregunta.emit();
  }


  ngOnInit() {
  }


}
