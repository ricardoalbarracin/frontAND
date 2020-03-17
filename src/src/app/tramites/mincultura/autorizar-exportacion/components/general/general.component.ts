import { Component, OnInit } from '@angular/core';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(public service: AutorizarExportacionUtilService) { 
    this.service.asignarPaso(2);
    this.service.asignarpasoIngresar(2);
    this.service.asignarLlega(2);
  }

  ngOnInit() {
  }

  volver(){
    this.service.asignarPaso(2);
    this.service.asignarpasoIngresar(2);
    this.service.asignarFormularioInvalido(false);
  }

}
