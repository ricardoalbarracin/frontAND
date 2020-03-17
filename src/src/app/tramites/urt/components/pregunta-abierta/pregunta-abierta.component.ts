import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-urt-pregunta-abierta',
  templateUrl: './pregunta-abierta.component.html',
  styleUrls: ['./pregunta-abierta.component.scss']
})
export class PreguntaAbiertaComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor( private location: Location) {
  }

}
