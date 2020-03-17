import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerarCertificado } from '../models/generar-certificado';
import { ValidarCertificado } from '../models/validar-certificado';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class CensoIndigenaService {

// API path
path = 'CensoIndigena/';
obtenerTiposDocumentos = 'obtenerTiposDocumentos';
generarCertificado = 'generarCertificado';
validarCertificado = 'validarCertificado';

constructor(private http: HttpClient) { }

  getTiposDocumentos() {
    return this.http.get<SelectListItemModel[]>(this.path + this.obtenerTiposDocumentos);
  }

  postGenerarCertificado(item: GenerarCertificado) {
    return this.http.post(this.path + this.generarCertificado, item, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }

  postValidarCertificado(item: ValidarCertificado) {
    return this.http.post(this.path + this.validarCertificado, item, {
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }

}
