import { Injectable } from '@angular/core';
import { ConsultorioJuridico, HorarioConsultorio, QueryParams } from '../models/ConsultorioJuridico';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class MinjusticiaUtilsService {

  messagesList: any; 
  consultorio: ConsultorioJuridico;
  consultoriosList: any[];
  params: QueryParams;
  citaData: any;

  //Url usada para redirigir dentro de la app
  private tramiteUrlBase = "tramites-y-servicios/minjusticia/agendamiento-consultorios/S007";

  private baseUrl: string = "AgendamientoConsultorios/";
  private divipolaUrl: string = "ObtenerDivipola";
  private municipiosConsultoriosUrl: string = "ObtenerMunicipiosConConsultorios";
  private consultoriosUrl: string = "ObtenerConsultorios?idMunicipio=";
  private temasUrl: string = "ObtenerTemas";
  private tiposDocumentoUrl: string = "ObtenerTiposDocumento";
  private estratosUrl: string = "ObtenerEstratos";
  private ingresosUrl: string = "ObtenerTiposIngreso";
  private disponibilidadUrl: string = "ObtenerDisponibilidadConsultorio";
  private agendarCitaUrl: string = "AgendarCita";
  private cancelarCitaUrl: string = "CancelarCita";
  private citasAgendadasUlr: string = "ObtenerHistoricoCitas?username="

  constructor(private http: HttpClient) { 
  }

  getTramiteUrl(): string {
    return this.tramiteUrlBase;
  }

  /*Métodos para almacenar en el contexto del trámite la información 
    que se vaya recogiendo de la solicitud de cita
  */
    //Guarda los parametros de consulta iniciales (fecha y ciudad)
      setQueryParams(params: QueryParams, consultorios: any[]) : void{
        this.params = params;
        this.consultoriosList = consultorios;
      }

      //obtiene los parametros iniciales de fecha y ciudad para consultarse en las vistas
      getQueryParams() : QueryParams  {
        return this.params;
      }

      resetQueryParams(): void {
        this.params = null;
        this.consultorio = null;
        this.consultoriosList = [];
      }

      //Conserva la información del consultorio juridico seleccionado
      setConsultorio(consultorio: ConsultorioJuridico) : void {
        this.consultorio = consultorio;
      }

      saveCitaData(cita: any): void {
        this.citaData = cita;
      }

      //Obtiene el consultorio juridico seleccionado
      getConsultorioSelected(): ConsultorioJuridico {
        return this.consultorio;
      }
  /* Fin de métodos para almacenar y consultar datos diligenciados durante el trámite  */
  
  getDivipola() {
    return this.http.get(this.baseUrl + this.divipolaUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  } 

  getMunicipiosWithConsultorios() {
    return this.http.get(this.baseUrl + this.municipiosConsultoriosUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }
  
  getTemas() {
    return this.http.get(this.baseUrl + this.temasUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  getTiposDocumento() {
    return this.http.get(this.baseUrl + this.tiposDocumentoUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  getIngresos() {
    return this.http.get(this.baseUrl + this.ingresosUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  getEstratos() {
    return this.http.get(this.baseUrl + this.estratosUrl, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  //Obtiene el listado de consultorios juridicos disponibles de acuerdo al criterio de busqueda
  queryListConsultoriosJuridicos(params: QueryParams) {
    return this.http.get(this.baseUrl + this.consultoriosUrl + params.idCiudad, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  //Obtiene los consultorios disponibles
  getListConsultoriosJuridicos() {
    return this.consultoriosList;
  }

  //Obtiene los horarios disponibles para citas de un consultorio juridico especifico
  getHorariosConsultorio(idConsultorio: number) {
    const params = {
      fecha: this.params.fechaString,
      idConsultorio: idConsultorio
    }

    return this.http.post(this.baseUrl + this.disponibilidadUrl, params, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  setCita(data: any, token: string) {
    return this.http.post(this.baseUrl + this.agendarCitaUrl, data, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append('angular-show-loading', 'true')
        .append('Token', token)
    });
  }

  cancelarCita(data: any, token: string) {
    return this.http.post(this.baseUrl + this.cancelarCitaUrl, data, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append('angular-show-loading', 'true')
        .append('Token', token)
    });
  }

  getListCitasAgendadas(username: string) {
    return this.http.get(this.baseUrl + this.citasAgendadasUlr + username, {
      headers: new HttpHeaders()
                    .append("angular-show-loading", "true")
    });
  }

  setTramiteStep(step: string): void {
    const areaServicio = document.getElementsByTagName('govco-area-servicios');

    if(areaServicio != undefined && areaServicio.length > 0 ){
      areaServicio[0].setAttribute('steptramites', step);
    }
  }
}
