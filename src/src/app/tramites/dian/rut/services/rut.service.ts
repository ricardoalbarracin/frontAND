import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosPersonales } from '../models/obtener-copia-rut';

@Injectable({
  providedIn: 'root'
})
export class RutService {

// API path
path = 'dian/CopiaRut/';
obtenerTiposDocumentos = 'obtenerTiposDocumentos';
generarCertificado = 'obtenerCopiaRut';

  constructor(private http: HttpClient) { }

  getTiposDocumento() {
    return this.http.get(this.path + this.obtenerTiposDocumentos, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  GetCertificado(datosPersonales: DatosPersonales) {
    return this.http.post(this.path + this.generarCertificado, datosPersonales, {
      responseType: "json",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }
}

