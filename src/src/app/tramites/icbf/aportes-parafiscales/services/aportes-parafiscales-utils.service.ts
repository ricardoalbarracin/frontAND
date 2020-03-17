import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { InputListModel } from '../models/inputListModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { LoginModel } from '../models/loginModel';
import { IdentificacionModel } from '../models/identificacionModel';
import { DataCertificacionModel } from '../models/dataCertificacionModel';
import { InformativoModel } from '../models/informativoModel';


@Injectable({
  providedIn: 'root'
})
export class AportesParafiscalesUtilsService {

  private urlTramite = {
    listas: 'icbf/AportesParafiscales/listas',
    registrar: 'icbf/AportesParafiscales/registro',
    login: 'icbf/AportesParafiscales/login',
    vigencias: 'icbf/AportesParafiscales/vigencias',
    verificar: 'icbf/AportesParafiscales/verificar',
    generar: 'icbf/AportesParafiscales/generar',
    recordarPassword: 'icbf/AportesParafiscales/forgot-password',
    informativos: 'icbf/AportesParafiscales/informativos'
  };

  constructor(private http: HttpClient) {}

  // Cargar listas (Operadores - Peridos)
  public getListas(inputListModel: InputListModel) {
    return this.http.post<SelectListItemModel[]>(this.urlTramite.listas, inputListModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Registrar usuario
  public registrar(registerModel: RegisterModel) {
    return this.http.post<ResponseModel>(this.urlTramite.registrar, registerModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Registrar usuario
  public login(loginModel: LoginModel) {
    return this.http.post<ResponseModel>(this.urlTramite.login, loginModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Cargar vigencias
  public getVigencias(identificacionModel: IdentificacionModel) {
    return this.http.post<SelectListItemModel[]>(this.urlTramite.vigencias, identificacionModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // VerificarCertificado
  public verificar(dataCertificacionModel: DataCertificacionModel) {
    return this.http.post<ResponseModel>(this.urlTramite.verificar, dataCertificacionModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Generar certificado
  public generar(item: DataCertificacionModel) {
    return this.http.post(this.urlTramite.generar, item, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  // Recuperar contaseña
  public forgotPassword(identificacionModel: IdentificacionModel) {
    return this.http.post<ResponseModel>(this.urlTramite.recordarPassword, identificacionModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Cargar informativos (Politica de tratamiento de datos personales)
  public getInformativos(informativoModel: InformativoModel) {
    return this.http.post<InformativoModel>(this.urlTramite.informativos, informativoModel, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
    .pipe(catchError(this.errorHandler));
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
