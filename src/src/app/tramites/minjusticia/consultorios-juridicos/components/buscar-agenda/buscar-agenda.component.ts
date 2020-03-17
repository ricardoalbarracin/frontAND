import { Component, OnInit } from '@angular/core';
import  jsonStrings  from '@stringResources/tramites/consultorios-juridicos.json';
import { Router } from '@angular/router';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import {BuscarAgendaForm }  from './buscar-agenda-form';
import { FormGroup } from '@angular/forms';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { QueryParams } from '../../models/ConsultorioJuridico';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar-agenda',
  templateUrl: './buscar-agenda.component.html',
  styleUrls: ['./buscar-agenda.component.scss']
})
export class BuscarAgendaComponent implements OnInit {

  public noticeMessage: string;
  public invalidForm: boolean;
  public buscarAgendaForm: BuscarAgendaForm;
  public form: FormGroup;
  public messages: any;
  public listCities: SelectListItemModel[];
  public divipola: any[];
  public currentDate: NgbDateStruct;
  public currentMessage: string;
  
  constructor(private router: Router,
      private service: MinjusticiaUtilsService,
      private authService: AgendamientoAuthenticationService,
      private tramiteService: MinjusticiaUtilsService ) {
  }
  
  ngOnInit() {
    this.setCurrentDate();
    this.getDivipola();

    this.buscarAgendaForm = new BuscarAgendaForm();
    this.form = this.buscarAgendaForm.getForm();
    this.messages = {
      advice: jsonStrings.messages.advice,
      searchEmpty : jsonStrings.messages["buscar-agenda"]["search-empty"]
    }
  }

  setCurrentDate(): void {
    var currentDate = new Date();

    this.currentDate = {
      day: currentDate.getDate(),
      month: (currentDate.getMonth() + 1),
      year: currentDate.getFullYear()
    }
  }

  //Obtiene los datos de divipola del trámite
  getDivipola(): void {
    this.tramiteService.getMunicipiosWithConsultorios().subscribe(
      (data) => { 
        if(data["success"] === true){
          this.prepareMunicipios(data["result"]);
        }
      }
    );
  }

  prepareMunicipios(list: any): void {
    if (list != undefined && list.length > 0) {
      this.listCities = list.map((item) => {
        return {
          text: item.MunicipioNombre,
          value: item.id
        }
      }); 

      this.divipola = list;
    }
  }

  //Verifica si el formulario fue correctamente diligenciado y realiza la busqueda de consultorios
  search() {
    this.invalidForm = false;
    if (!this.buscarAgendaForm.isValid()){
      this.invalidForm = true;
      this.currentMessage = this.messages.searchEmpty;
      return;
    }

    var formResult = this.buscarAgendaForm.getFormValues();
    var coordenadas = this.getMunicipioUbicacion(formResult.ciudad.value);
    
    this.queryConsultorios({
      ciudad: "" + formResult.ciudad.text,
      fecha: new Date(formResult.fecha.year, formResult.fecha.month -1, formResult.fecha.day),
      fechaString: formResult.fecha.day + "/" + (formResult.fecha.month -1) + "/" + formResult.fecha.year,
      idCiudad: parseInt(formResult.ciudad.value),
      latitud: coordenadas != undefined ? coordenadas.latitud: "",
      longitud: coordenadas != undefined ? coordenadas.longitud: ""
    });
  }

  //obtiene las coordenadas del municipio seleccionado
  getMunicipioUbicacion(idCiudad: number): any {
    var result = this.divipola.find((item) => {
      return item.id === idCiudad
    });

    if (result == undefined){
      return undefined;
    }

    return {
      latitud: result.MunicipioLatitud,
      longitud: result.MunicipioLongitud
    }
  } 

  //Consulta los consultorios juridicos disponibles de acuerdo a lo diligenciado 
  //y redirige si existen consultorios para el municipio dado
  queryConsultorios(params: QueryParams) {
    const tramiteUrl = this.service.getTramiteUrl();

    this.tramiteService.queryListConsultoriosJuridicos(params).subscribe(
      (data) => {         
        if(data["success"] === true){
          if(data["result"] != undefined && data["result"] != "" && data["result"].length > 0){
            this.service.setQueryParams(params, data["result"]);
            this.router.navigate([tramiteUrl+ "/listarConsultorios"]);
          }else {
            this.invalidForm = true;
            this.currentMessage = "No hay consultorios disponibles para la fecha y el municipio seleccionado";
          }
        }else {
          this.invalidForm = true;
          this.currentMessage = data["message"];
        }
      },
      (error) => {
        this.invalidForm = true;
        this.currentMessage = "Se produjo un error al consultar los consultorios disponibles";
      }
    );
  }
}
