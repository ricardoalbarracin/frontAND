import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datosremitente-entidad',
  templateUrl: './datosremitente-entidad.component.html',
  styleUrls: ['./datosremitente-entidad.component.scss']
})
export class DatosremitenteEntidadComponent implements OnInit {


  listaOpcion: any [] = [
    {
      value: 1,
      text: 'Opcion1'
    },
    {
      value: 2,
      text: 'Opcion2'
    },
    {
      value: 3,
      text: 'Opcion3'
    },
    {
      value: 4,
      text: 'Opcion4'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
