import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-solicitud',
  templateUrl: './accion-solicitud.component.html',
  styleUrls: ['./accion-solicitud.component.scss']
})
export class AccionSolicitudComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);

  }

}
