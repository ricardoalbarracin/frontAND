import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosSolicitud } from '../models/descargar-rspp';

@Injectable({
  providedIn: 'root'
})
export class DescargarRsppService {

// API path
path = 'ica/DescargarRspp/';
obtenerDepartamentos = 'obtenerDepartamentos';
obtenerMunicipiosPor = 'obtenerMunicipiosPor/';
generarCertificado = 'obtenerCertificadoRspp';

  constructor(private http: HttpClient) { }

  getDepartamentos() {
    return this.http.get(this.path + this.obtenerDepartamentos, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getMunicipiosPor(codigoDepartamento: string) {
    return this.http.get(this.path + this.obtenerMunicipiosPor + codigoDepartamento, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  GetCertificado(datosSolicitud: DatosSolicitud) {
    return this.http.post(this.path + this.generarCertificado, datosSolicitud, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }
}
