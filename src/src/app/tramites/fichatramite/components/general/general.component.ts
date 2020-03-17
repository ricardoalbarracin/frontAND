import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTramiteService } from '../../services/ficha-tramite.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  tramite: any = {
    id: '',
    tipo: null,
    prefijo: ''
  };

  cosa: any;

  estadoHeader: any;

  dataEmbebidos;
  datosTipoFicha: string;
  embebido = false;


  constructor(
    public fichaTramiteService: FichaTramiteService,
    private activatedRoute: ActivatedRoute,
    ) { }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const parametroid = this.activatedRoute.snapshot.params.id;
    let idTramiteTemp = parametroid;

    if ( parametroid !== 'embebido' ) {
      this.tramite.id = parametroid.substring(1);
      this.tramite.prefijo = parametroid.substring(0, 1).toLowerCase();

      // Tramite suit
      if (this.tramite.prefijo === 't') {
        idTramiteTemp = this.tramite.id;
      }

      this.fichaTramiteService.GetTipoFichaTramite(idTramiteTemp)
        .subscribe( data => {
          this.tramite.tipo = data.StatusCode;
        });

    } else {
      this.embebido = true;
    }
  }


  redireccionador(evento) {
    // if(evento.tipo == "Embebido"){
    //   this.dataEmbebidos = evento.data;
    //   this.router.navigate(['ficha-tramite/T'+evento.id+'/embebido']);
    //   // let url = this.router.createUrlTree(['ficha-tramite/T'+evento.id+'/embebido'])
    //   // window.open(url.toString(), '_blank')
    //   this.embebido = true;

    // }else{
    //   this.router.navigate(['ficha-tramite/T'+evento.id+''])
    //   this.datosTipoFicha = "601";
    // }
  }


}

