import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTramiteService } from '../../services/ficha-tramite.service'


@Component({
  selector: 'ficha-estandar',
  templateUrl: './fichaestandar.component.html',
  styleUrls: ['./fichaestandar.component.scss']
})
export class FichaEstandarComponent implements OnChanges {
  @Input('tipoFicha') tipoFicha: number;
  @Output() propagar = new EventEmitter<object>();

  numeroId;
  dataBase: any;
  constructor(private route: ActivatedRoute, private fichaTramiteService:FichaTramiteService,private router: Router  ) {

  }
  ngOnChanges() {
    if(this.tipoFicha == 602 &&  this.tipoFicha != undefined){
      this.route.paramMap.subscribe(params => {
        this.numeroId = this.route.snapshot.params.id.substr(1,20)
        this.fichaTramiteService.GetInfoFichaEstandarById(this.numeroId).subscribe(res =>{
          this.dataBase = res;

        });
      });
      this.tipoFicha = 0;
    }
  }
  idMunicipio(id) {
    this.propagar.emit({ id : id});
  }

}

