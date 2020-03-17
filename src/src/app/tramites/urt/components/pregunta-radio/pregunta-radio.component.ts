import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-urt-pregunta-radio',
  templateUrl: './pregunta-radio.component.html',
  styleUrls: ['./pregunta-radio.component.scss']
})
export class PreguntaRadioComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor( private location: Location) {
  }

}
