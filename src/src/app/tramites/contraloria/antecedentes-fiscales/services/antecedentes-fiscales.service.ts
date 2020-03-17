import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosPersonales } from '../models/antecedentes-fiscales';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesFiscalesService {

  private urlTramite = {
    tiposDocumento: "antecedentesFiscales/obtenerTiposDocumento",
    obtenerCertificado: "antecedentesFiscales/GenerarCertificado"
  }

  constructor(private http: HttpClient) { }

  getTiposDocumento() {
    return this.http.get(this.urlTramite.tiposDocumento, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  GetCertificado(datosPersonales: DatosPersonales) {
    return this.http.post(this.urlTramite.obtenerCertificado, datosPersonales, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }
}
