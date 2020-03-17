import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosSolicitud} from '../models/validar-gsmi';

@Injectable({
  providedIn: 'root'
})
export class ValidarGsmiService {

// API path
path = 'ica/ValidarGsmi';
obtenerInformacion = 'obtenerInformacion';

  constructor(private http: HttpClient) { }

  GetInformacion(datosSolicitud: DatosSolicitud) {
    return this.http.post(this.path + this.obtenerInformacion, datosSolicitud, {
      responseType: "json",
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }
}
