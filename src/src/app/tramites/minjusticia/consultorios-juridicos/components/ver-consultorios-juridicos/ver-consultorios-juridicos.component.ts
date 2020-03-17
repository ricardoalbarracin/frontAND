import { Component, OnInit } from '@angular/core';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { ConsultorioJuridico, HorarioConsultorio } from '../../models/ConsultorioJuridico';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerConsultoriosJuridicosModalComponent } from '../ver-consultorios-juridicos-modal/ver-consultorios-juridicos-modal.component';
import { Router } from '@angular/router';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';

@Component({
  selector: 'app-ver-consultorios-juridicos',
  templateUrl: './ver-consultorios-juridicos.component.html',
  styleUrls: ['./ver-consultorios-juridicos.component.scss']
})
export class VerConsultoriosJuridicosComponent implements OnInit {

  defaultUbication: any = {
    latitude: 4.6097102,
    longitude: -74.081749
  }
  mapMarkups: any[];
  tramiteUrl : string;

  consultoriosJuridicos: ConsultorioJuridico[];

  constructor(private service: MinjusticiaUtilsService,
      private modalService: NgbModal,
      private router: Router,
      private authService: AgendamientoAuthenticationService ) {
      this.tramiteUrl = this.service.getTramiteUrl();
  }

  ngOnInit() {
    let queryParams = this.service.getQueryParams();

    if(queryParams == undefined ){
      this.router.navigate([this.tramiteUrl]);
      return;
    }    

    this.setMunicipioMap(queryParams.latitud, queryParams.longitud);    
    this.consultoriosJuridicos = this.service.getListConsultoriosJuridicos();
    this.createMapMarkups();
  }

  setMunicipioMap(latitud: string, longitud: string): void {
    if(latitud != null && latitud != "" && latitud != "0.0" 
      && latitud != null && latitud != "" && latitud != "0.0"){
        this.defaultUbication.latitude = latitud;
        this.defaultUbication.longitude = longitud;
    }
  }

  selectConsultorio(consultorioJuridico) {
    let modal = this.modalService.open(VerConsultoriosJuridicosModalComponent, { 
      size: 'lg', 
      backdrop: "static",
      keyboard: false
    });

    modal.componentInstance.consultorio = consultorioJuridico;
    modal.componentInstance.selectEvent.subscribe((consultorio) => {
      if (consultorio != undefined){
        this.service.setConsultorio(consultorio);
        this.router.navigate([this.tramiteUrl +"/agendarcita"]);
      }
    });
  }

  createMapMarkups(): void {    
    if (this.consultoriosJuridicos.length > 0) {
      this.mapMarkups = this.consultoriosJuridicos.filter((item) => {
        return (item.ConsultorioLatidud != undefined && item.ConsultorioLatidud != 0)
          && (item.ConsultorioLongitud != undefined && item.ConsultorioLongitud != 0)
      }).map((item) => {
        return {
          lat: item.ConsultorioLatidud,
          lng: item.ConsultorioLongitud,
          label: item.ConsultorioNombre,
          alpha: 1
        }
      });
    }
  }

  selectMarker(element): void {
    const consultorio = this.consultoriosJuridicos.find((item) => {
      return item.ConsultorioLatidud == element.latitude 
        && item.ConsultorioLongitud == element.longitude;
    });

    if (consultorio != undefined) {
      const idElement = 'consultorio-' + consultorio.id;

      let divFocus = document.getElementById(idElement);
      if (divFocus != undefined) {
        divFocus.scrollIntoView();

        divFocus.classList.add("consultorio-selected");
        setTimeout(function() {
          divFocus.classList.remove("consultorio-selected");
        }, 2000);
      }
    }
  }
}
