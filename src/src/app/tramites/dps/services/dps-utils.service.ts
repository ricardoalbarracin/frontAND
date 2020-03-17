import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DatosVerificar } from '../models/datosVerificar';
import { TiposDocumento } from './../models/tiposDocumento';
import { DatosVinculacion } from '../models/datosVinculacion';
import { ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DpsUtilsService {
  url = 'http://localhost:8081/';

  constructor(private http: HttpClient) {}

  public sendVerificarDps(datosVerificar: DatosVerificar) {
    const params = new HttpParams().set('documento', datosVerificar.documento);
    return this.http
      .get<any>(`ConsultaCertiunidos/ObtenerPersonaUnidosPorCodigoVerificacion`, { params })
      .pipe(catchError(this.errorHandler));
  }

  public sendVinculacion(datosVinculacion: DatosVinculacion) {
    const params = new HttpParams().set('numeroDocumento', datosVinculacion.documento)
            .append('tipoDocumento', datosVinculacion.tipo_documento ? datosVinculacion.tipo_documento.value : '');
    const headers = new HttpHeaders().set("Content-Type", "application/json")
      .append("angular-show-loading", "true");
    return this.http
      .get(`Dps/Vinculacion`,
        { headers, params , responseType: "blob"})
      .pipe(catchError(this.errorHandler));
  }

  public sendVerificacion(datosVerificar: DatosVerificar) {
    const params = new HttpParams()
      .set('codigoVerificacion', datosVerificar.documento);
    const headers = new HttpHeaders().set("Content-Type", "application/json")
      .append("angular-show-loading", "true");
    return this.http
      .get(`Dps/Verificacion`,
        { headers, params , responseType: "blob"})
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  public getTiposDocumento(): TiposDocumento[] {
    return [
      { value: 'CC', text: 'Cédula de ciudadanía' },
      { value: 'Pasaporte', text: 'Pasaporte' },
      { value: 'TI', text: 'Tarjeta de identidad' },
      { value: 'RC', text: 'Registro Civil con Número Único de Identificación Personal (NUIP)' },
      { value: 'CE', text: 'Cédula de extranjería' },
      { value: 'DNI', text: 'Documento Nacional de Identidad (DNI) del país de origen' },
      { value: 'SCR', text: 'Salvoconducto para refugiado' },
      { value: 'PEP', text: 'Permiso especial de permanencia (PEP) para ciudadanos venezolanos' },
    ];
  }
}
