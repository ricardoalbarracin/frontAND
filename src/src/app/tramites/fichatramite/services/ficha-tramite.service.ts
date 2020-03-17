import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoFichaTramite, DatosBaseFichaTramite, TipoEnlace,
         TipoAudiencia, MomentosAudienciaTitulo, DataMomentosAudiencia,
         CanalesAtencion, PuntosAtencion, InformacionPago, Normatividad,
         PuntosFichaTramiteEstandar, Embebidos, TramiteNoSuite, Condiciones,
         PuntosAtencionNoSuite } from '../models/tipo-ficha-tramite';
import { map } from 'rxjs/operators';

const API_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class FichaTramiteService {

constructor(private http: HttpClient) {
 }

  private getGeneric<T>(endPoint: string, parameters: string = '') {
    return this.http.get<T>(`${API_URL}${endPoint}${parameters}`);
  }

  GetTipoFichaTramite(idTramite) {
    return this.getGeneric<TipoFichaTramite>('FichaTramite/GetTipoFichaTramiteById/', idTramite );
  }
  GetInfoBasicaEspecifica(idTramite) {
    return this.getGeneric<DatosBaseFichaTramite>('FichaTramite/GetInfoBasicaEspecificaById/', idTramite)
    .pipe(
      map( (n: DatosBaseFichaTramite) => {
        n.Entidad = n.Entidad.toLowerCase();
        return n;
      })
    );
  }
  GetTipoTramiteFichaEspecificaById(idTramite) {
    return this.getGeneric<TipoEnlace>('FichaTramite/GetTipoTramiteFichaEspecificaById/', idTramite);
  }
  GetTiposAudienciaById(idTramite) {
    return this.getGeneric<TipoAudiencia[]>('FichaTramite/GetTiposAudienciaById/', idTramite);
  }
  GetMomentosByIdAudiencia(idTramite, audiencia) {
    return this.getGeneric<MomentosAudienciaTitulo[]>('FichaTramite/GetMomentosByIdAudiencia/' , `${idTramite}/${audiencia}`);
  }
  GetDataFichaByIdAudiencia(idTramite, audiencia, momento) {
    return this.getGeneric<DataMomentosAudiencia[]>('FichaTramite/GetDataFichaByIdAudiencia/', `${idTramite}/${audiencia}/${momento}`);
  }
  GetCanalesByMomentoIdAudiencia(idTramite, audiencia, momento) {
    return this.getGeneric<CanalesAtencion[]>('FichaTramite/GetCanalesByMomentoIdAudiencia/', `${idTramite}/${audiencia}/${momento}`);
  }
  GetPuntosAtencionById(idTramite) {
    return this.getGeneric<PuntosAtencion[]>('FichaTramite/GetPuntosAtencionById/', idTramite);
  }
  GetPagosByMomentoIdAudiencia(idTramite, audiencia, momento) {
    return this.getGeneric<InformacionPago[]>('FichaTramite/GetPagosByMomentoIdAudiencia/', `${idTramite}/${audiencia}/${momento}`);
  }
  GetNormatividadById(idTramite) {
    return this.getGeneric<Normatividad[]>('FichaTramite/GetNormatividadById/', idTramite);
  }
  GetInfoFichaEstandarById(idTramite) {
    return this.getGeneric<PuntosFichaTramiteEstandar>('FichaTramite/GetInfoFichaEstandarById/', idTramite);
  }
  GetEmbebidosByIdTramite(idTramite) {
    return this.getGeneric<Embebidos>('TramitesEmbebidos/GetEmbebidosByIdTramite/', idTramite);
  }
  GetNotSuiteTramiteById(idTramite) {
    return this.getGeneric<TramiteNoSuite>('FichaNoSuitTramite/GetNotSuiteTramiteById/', idTramite);
  }
  GetConsideracionesAdicionalesById(idTramite) {
    return this.getGeneric<Condiciones[]>('FichaNoSuitTramite/GetConsideracionesAdicionalesById/', idTramite);
  }
  GetPuntosAtencionNoSuitById(idTramite) {
    return this.getGeneric<PuntosAtencionNoSuite[]>('FichaNoSuitTramite/GetPuntosAtencionNoSuitById/', idTramite);
  }
}
