import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DataSolicitudPasaporteModel } from '../models/dataSolicitudPasaporteModel';
import { DataConsultaSolicitudModel } from '../models/consultaSolicitudModel';

export class TramitarPasaporteService {

  private urlTramite = {
    tiposDocumento: "TramitarPasaporte/obtenertiposdocumento",
    tiposPasaporte: "TramitarPasaporte/ObtenerTiposPasaporte",
    listadoOficinas: "TramitarPasaporte/ObtenerOficinas",
    motivosSolicitud: "TramitarPasaporte/ObtenerMotivosSolicitud?tipoPasaporte=",
    solicitarPasaporte: "TramitarPasaporte/SolicitarPasaporte?modelSolicitud=",
    tratamientoDatos: "TramitarPasaporte/ObtenerTratamientoDatosPersonales",
    dataComprobante: "TramitarPasaporte/ObtenerDataComprobante?solicitudId=",
    consultaSolicitud: "TramitarPasaporte/ConsultarSolicitud?modelConsulta="
  }

  constructor(private http: HttpClient) { }

  getTiposDocumento() {
    return this.http.get(this.urlTramite.tiposDocumento, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getTiposPasaporte() {
    return this.http.get(this.urlTramite.tiposPasaporte, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListadoOficinas() {
    return this.http.get(this.urlTramite.listadoOficinas, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getMotivosSolicitud(tipoPasaporte: number) {
    let url = this.urlTramite.motivosSolicitud + tipoPasaporte;
    return this.http.get(url, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getTratamientoDatos() {
    return this.http.get(this.urlTramite.tratamientoDatos, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  insSolicitudPasaporte(modelSolicitud:DataSolicitudPasaporteModel) {
    return this.http.post(this.urlTramite.solicitarPasaporte, modelSolicitud, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')      
    });
  }

  getDataComprobante(solicitudId: string) {
    let url = this.urlTramite.dataComprobante + solicitudId;
    return this.http.post(url, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getDataSolicitud(modelConsulta:DataConsultaSolicitudModel) {    
    return this.http.post(this.urlTramite.consultaSolicitud, modelConsulta, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')      
    });
  }
  
}
