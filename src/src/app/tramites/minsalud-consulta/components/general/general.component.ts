import { Input, Component, OnInit } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../services/minsalud-consulta-util.service';

@Component({
  selector: 'app-minsalud-consulta-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  consultaService: any = {};
  constructor(private concultaServices: MinsaludConsultaUtilService) { 
    this.consultaService = concultaServices;
    this.consultaService.asignarMostrarDetalle(false);
    this.consultaService.asignarMostrarDetalleSinResultados(false);
    this.consultaService.asignarDescargaCompleta(false);
  }

  ngOnInit() {
  }

}
