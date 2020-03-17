import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { requestUsuario, requestRegistrarUsuario, responseRegistrarUsuario, requestUsuarioxID, responseService, requestUsuarioxDocumento, Persona } from '../models/sic-models'
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SicUtilsService {

  constructor(private http: HttpClient) { }

  private Basepath = "sic/DenunciaInfraccion/";
  private obtenerListasGenericas = "getListasGenericas/";
  private obtenerListaRegion = "getListasRegion/";
  private obtenerListaCiudad = "getListasCiudad/";
  private autenticarUsuario = "AutenticarUsuario";
  private consultarPersona = "ConsultarPersona";
  private registrarUsuario = "RegistrarUsuario";
  private registrarPersona = "RegistrarPersona";
  private desplegarGrilla = false;

  get getdesplegarGrilla() { return this.desplegarGrilla; }
  set setdesplegarGrilla(val:any){ this.desplegarGrilla = val;}

  getListaGenericas(value: string) {
    return this.http.get(this.Basepath + this.obtenerListasGenericas + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaRegion(value: string) {
    return this.http.get(this.Basepath + this.obtenerListaRegion + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaCiudad(value: string) {
    return this.http.get(this.Basepath + this.obtenerListaCiudad + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  postAutenticarUsuario(value: requestUsuario) {
    return this.http.post(this.Basepath + this.autenticarUsuario, value, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    }).pipe(
      map(response => {
        if (response["usuario"] == null)
          return 0;
        else
          return response["usuario"]["id"];
      })
    );
  }

  postConsultarPersona(value: requestUsuarioxID) {
    return this.consPostConsultarPersona(value);
  }

  postConsultarPersonaXDocumento(value: requestUsuarioxDocumento) {
    return this.consPostConsultarPersona(value);
  }

  consPostConsultarPersona(value: any) {
    return this.http.post<responseService>(this.Basepath + this.consultarPersona, value, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    }).pipe(catchError(this.errorHandler));
  }

  postRegistrarUsuario(value: requestRegistrarUsuario) {
    return this.http.post<responseRegistrarUsuario>(this.Basepath + this.registrarUsuario, value, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    }).pipe(catchError(this.errorHandler));
  }

  postRegistrarPersona(value: Persona) {
    return this.http.post<responseService>(this.Basepath + this.registrarPersona, value, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    }).pipe(catchError(this.errorHandler));
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
