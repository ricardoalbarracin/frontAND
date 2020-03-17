import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accion-verificacion',
  templateUrl: './accion-verificacion.component.html',
  styleUrls: ['./accion-verificacion.component.scss']
})
export class AccionVerificacionComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);

  }

}
