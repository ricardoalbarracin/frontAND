import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-urt-pregunta-imagen',
  templateUrl: './pregunta-imagen.component.html',
  styleUrls: ['./pregunta-imagen.component.scss']
})
export class PreguntaImagenComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor( private location: Location) {
  }

}
