import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SolicitudCertificadoModel } from '../models/SolicitudCertificadoModel';

export class LicenciaConduccionService {

  private baseUrl: string = "CertificadoLicencia/";
  private paisesUrl: string = "ObtenerListadoPaises";
  private entidadesUrl: string = "obtenerListadoEntidades";
  private tiposDocumentoUrl: string = "ObtenerTiposDocumento";
  private postUrl: string = "Solicitar";

  constructor(private http: HttpClient) { }

  getEntidades() {
    return this.http.get(this.baseUrl + this.entidadesUrl, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getPaises() {    
    return this.http.get(this.baseUrl + this.paisesUrl, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getTiposDocumento() {    
    return this.http.get(this.baseUrl + this.tiposDocumentoUrl, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  postSolicitud(formData: SolicitudCertificadoModel) {
    return this.http.post(this.baseUrl + this.postUrl, formData, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }
}
