import { Injectable } from '@angular/core';
import { TramiteModel } from '../models/tramiteModel';
import { TramiteNoSuitModel } from '../models/tramiteNoSuitModel';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TramiteDetailService {
  private urlTramite = {
    detail: 'FichaTramite/GetInfoBasicaEspecificaById/',
    detailNoSuit: 'FichaNoSuitTramite/GetNotSuiteTramiteById/',
  };

  constructor(private http: HttpClient) { }

  getInfoBasicaEspecificaById(id: string) {
    return this.http.get<TramiteModel>(this.urlTramite.detail + id);
  }

  getNotSuiteTramiteById(id: string) {
    return this.http.get<TramiteNoSuitModel>(this.urlTramite.detailNoSuit + id);
  }

}
