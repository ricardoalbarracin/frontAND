import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { DatosSolicitante } from '../models/datosSolicitante';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CertificadoConstancia } from '../models/certificadoConstancia';
import { TiposDocumento } from '../models/tiposDocumento';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class SenaUtilsService {
  private urlTramite = {
    consultar: 'sena/CertificadoConstancia/consultar'
  };

  certificadosConstancias: CertificadoConstancia[];
  datosSolicitante: DatosSolicitante;
  tiposDocumento: SelectListItemModel[];

  constructor(private http: HttpClient) {}

  public consultarCertificadosCosntancias(datosSolicitante: DatosSolicitante) {
    return this.http.post<CertificadoConstancia[]>(this.urlTramite.consultar, datosSolicitante, {
      headers: new HttpHeaders().append('angular-show-loading', 'true')
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  public setDatosSolicitante(datosSolicitante: DatosSolicitante) {
    this.datosSolicitante = datosSolicitante;
  }

  public getDatosSolicitante(): DatosSolicitante {
    return this.datosSolicitante;
  }

  public setListCertificadosConstancias(
    certificadosConstancias: CertificadoConstancia[]
  ) {
    this.certificadosConstancias = certificadosConstancias;
  }

  public getListCertificadosConstancias(): CertificadoConstancia[] {
    return this.certificadosConstancias;
  }

  public getTiposDocumento(): SelectListItemModel[] {
    this.tiposDocumento = [
      { value: 'CC', text: 'Cédula de ciudadanía' },
      { value: 'CE', text: 'Cédula de extranjería' },
      { value: 'PEP', text: 'Permiso especial de permanencia' },
      { value: 'PS', text: 'Pasaporte' },
      { value: 'TI', text: 'Tarjeta de identidad' },
      { value: 'DNI', text: 'Documento Nacional de Identificación (DNI)' },
      { value: 'RC', text: 'Registro civil' },
      { value: 'PR', text: 'Pep ramv' }
    ];
    return this.tiposDocumento;
  }
}
