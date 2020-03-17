import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-urt-principal',
  templateUrl: './principal-urt.component.html',
  styleUrls: ['./principal-urt.component.scss']
})
export class PrincipalUrtComponent implements OnInit {
  public activePregunta = false;
  public activeRespueta = false;
  public preguntaNumero = 0;

  ngOnInit(): void {
  }

  public  activarPreguntas() {
    this.activePregunta = true;
    this.preguntaNumero = 1;
  } 

  public  siguientePregunta(event){
    this.preguntaNumero++;
    if(this.preguntaNumero>3){
      this.activeRespueta = true;
    }
  }

  constructor( private location: Location) {
  }

}
