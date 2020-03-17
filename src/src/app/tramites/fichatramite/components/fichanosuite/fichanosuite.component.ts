import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTramiteService } from '../../services/ficha-tramite.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PuntosAtencionComponent } from '../puntos-atencion-modal/puntos-atencion-modal.component';



@Component({
  selector: 'ficha-no-suite',
  templateUrl: './fichanosuite.component.html',
  styleUrls: ['./fichanosuite.component.scss']
})
export class FichaNoSuiteComponent implements OnChanges {
  @Input('tipoFicha') tipoFicha: string;
  dataBase: any;
  consideraciones = [];
  puntosAtencion = [];
  numeroId;

  constructor(private route: ActivatedRoute, private fichaTramiteService:FichaTramiteService,private router: Router, private modalService: NgbModal  ) {

  }

  ngOnChanges() {
    if(this.tipoFicha == "603" &&  this.tipoFicha != undefined){
      this.route.paramMap.subscribe(params => {
        this.numeroId = this.route.snapshot.params.id.substr(1,20);
        this.fichaTramiteService.GetNotSuiteTramiteById(this.route.snapshot.params.id).subscribe(data =>{
          this.dataBase = data;
        })
        this.fichaTramiteService.GetConsideracionesAdicionalesById(this.route.snapshot.params.id).subscribe(data =>{
          this.consideraciones = data;
        })
        this.fichaTramiteService.GetPuntosAtencionNoSuitById(this.route.snapshot.params.id).subscribe(data =>{
         this.getDatosPuntosAtencion(data);
        })
      })
    }
  }
  async getDatosPuntosAtencion(data){
    for(const item of data) {
      let punto = await  this.fichaTramiteService.GetPuntosAtencionById(item.PuntosAtencionId).toPromise();
      this.puntosAtencion.push(punto[0]);
    }
  }

  showModal(data) {
   const modal = this.modalService.open(PuntosAtencionComponent, { size: 'lg',
      backdrop: "static",
      keyboard: false
    });
    modal.componentInstance.puntosAtencion = data;
  }

  ngAfterViewChecked(){
    this.setNumeroTramite(this.numeroId);
  }
  setNumeroTramite(numero: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    if(s.length > 0){
      s[0].setAttribute('itemid', "S"+numero);
    }
  }
}

