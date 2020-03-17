import { Injectable } from '@angular/core';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { DatosSolicitanteModel } from '../models/datosSolicitanteModel';

@Injectable({
  providedIn: 'root'
})
export class CertificadoAfiliacionUtilsService {

  private urlTramite = {
    descargar: 'colpensiones/CertificadoAfiliacion/descargar',
    enviar: 'colpensiones/CertificadoAfiliacion/enviar',
  };

  tiposDocumento: SelectListItemModel[];

  constructor(private http: HttpClient) { }

  public getTiposDocumento(): SelectListItemModel[] {
    this.tiposDocumento = [
      { value: 'CC', text: 'CC - Cédula de ciudadanía' },
      { value: 'CE', text: 'CE - Cédula de extranjería' },
      { value: 'TI', text: 'TI - Tarjeta de identidad' },
      { value: 'PA', text: 'PA - Pasaporte' },
      { value: 'CD', text: 'CD - Carnet Diplomático' }
    ];
    return this.tiposDocumento;
  }

  // Generar certificado
  public descargar(item: DatosSolicitanteModel) {
    return this.http.post(this.urlTramite.descargar, item, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  // Enviar correo
  public enviar(item: DatosSolicitanteModel) {
    return this.http.post(this.urlTramite.enviar, item, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    })
  }

}
