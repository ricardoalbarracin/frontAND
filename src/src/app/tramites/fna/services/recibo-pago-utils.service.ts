import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from '../models/userModel';
import { CreditDataModel } from '../models/creditDataModel';
import { ReqListModel } from '../models/reqListModel';
import { DocumentoModel } from '../models/documentoModel';

@Injectable({
  providedIn: 'root'
})
export class ReciboPagoUtilsService {
  
  private urlTramite = {
    login: 'fna/ReciboPago/login',
    creditos: 'fna/ReciboPago/list',
    descargar: 'fna/ReciboPago/descargar'
  };

  userData: UserModel;

  constructor(private http: HttpClient) { }

  // Ingresar
  public login(loginModel: LoginModel) {
    return this.http.post<ResponseModel>(this.urlTramite.login, loginModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Almacena información del usuario
  public setUserData(user: UserModel) {
    this.userData = user;
  }

  // Entrega información del usuario
  public getUserData(): UserModel {
    return this.userData;
  }

  // COnsulta listado de creditos
  public getCreditList(reqList: ReqListModel){
    return this.http.post<ResponseModel>(this.urlTramite.creditos, reqList, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  } 

  // Descargar Recibo de Pago
  public descargar(documento: DocumentoModel) {
    return this.http.post(this.urlTramite.descargar, documento, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
