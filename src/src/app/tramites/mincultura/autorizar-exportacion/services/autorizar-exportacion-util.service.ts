import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ReturnModelObtenerTiposDocumentosidentidad,Tiposdocumento } from '../models/ReturnModelObtenerTiposDocumentosidentidad';
import { ReturnModelLista } from '../models/ReturnModelLista';
import { ReturnModelObtenerMunicipios } from '../models/returnmodelobtenermunicipios';

@Injectable({
  providedIn: 'root'
})
export class AutorizarExportacionUtilService {

  private urlTramite = {
    ObtenerListasCrearSolicitud:"SolicitudExportacion/ObtenerListasCrearSolicitud",
    obtenerSolicitudPorNroConsecutivo: "SolicitudExportacion/ObtenerSolicitudPorNroConsecutivo",
    obtenerListaAnexos: "SolicitudExportacion/ObtenerListaAnexos",
    obtenerListaConceptosSolicitud: "SolicitudExportacion/ObtenerListaConceptosSolicitud",
    obtenerListaConceptosObras: "SolicitudExportacion/ObtenerListaConceptosObras",
    obtenerListaPrestamo: "SolicitudExportacion/ObtenerListaPrestamo",
    obtenerListaDeterioro: "SolicitudExportacion/ObtenerListaDeterioro",
    obtenerSolicitudPorId: "SolicitudExportacion/ObtenerSolicitudPorId",
    obtenerSolicitudes: "SolicitudExportacion/ObtenerSolicitudes",
    obtenerObras: "SolicitudExportacion/ObtenerObras",
    obtenerAnexo: "SolicitudExportacion/ObtenerAnexo",
    obtenerConceptoSolicitud: "SolicitudExportacion/ObtenerConceptoSolicitud",
    obtenerSolicitudPorIntermediario: "SolicitudExportacion/ObtenerSolicitudPorIntermediario",
    obtenerSolicitudPorSolicitante: "SolicitudExportacion/ObtenerSolicitudPorSolicitante",
    obtenerReporte: "SolicitudExportacion/ObtenerReporte",
    crearSolicitud: "SolicitudExportacion/CrearSolicitud",
    actualizarSolicitud: "SolicitudExportacion/ActualizarSolicitud",
    enviarSolicitud: "SolicitudExportacion/EnviarSolicitud",
    crearObra: "SolicitudExportacion/CrearObra",
    actualizarObra: "SolicitudExportacion/ActualizarObra",
    eliminarObra: "SolicitudExportacion/EliminarObra",
    autenticacion: "SolicitudExportacion/Autenticacion",
    obtenerMunicipios: "SolicitudExportacion/ObtenerMunicipios",
    obtenerMunicipio: "SolicitudExportacion/ObtenerMunicipio",
    obtenerDepartamentos: "SolicitudExportacion/ObtenerDepartamentos",
    obtenerTiposMotivos: "SolicitudExportacion/ObtenerTiposMotivos",
    obtenerTiposRespuestas: "SolicitudExportacion/ObtenerTiposRespuestas",
    obtenerClasificacionesTipologicas: "SolicitudExportacion/ObtenerClasificacionesTipologicas",
    obtenerClasificacionesTipologicasGrupo: "SolicitudExportacion/ObtenerClasificacionesTipologicasGrupo",
    obtenerPaises: "SolicitudExportacion/ObtenerPaises",
    obtenerTiposDocumentosIndentidad: "SolicitudExportacion/ObtenerTiposDocumentosIndentidad",
    obtenerTiposEpocas: "SolicitudExportacion/ObtenerTiposEpocas",
    obtenerTiposTecnicas: "SolicitudExportacion/ObtenerTiposTecnicas",
    obtenerTiposBasPersonas: "SolicitudExportacion/ObtenerTiposBasPersonas",
    obtenerTiposPermanencia: "SolicitudExportacion/ObtenerTiposPermanencia",
    obtenerTiposFirma: "SolicitudExportacion/ObtenerTiposFirma",
    obtenerFinesExportacion: "SolicitudExportacion/ObtenerFinesExportacion",

  };
  paso:any;
  pasoIngresar:any;
  formularioInvalido:any;
  consultar:any;
  consultarVerConcepto:any;
  consultarVerDescargar:any;
  llega:any;

  constructor(private http: HttpClient) {}

  public asignarLlega(llegaParam){
    this.llega=llegaParam;
    return this.llega;
  }

  public asignarPaso(pasoParam){
    this.paso=pasoParam;
    return this.paso;
  }

  public asignarpasoIngresar(pasoIngresarParam){
    this.pasoIngresar=pasoIngresarParam;
    return this.pasoIngresar;
  }

  asignarFormularioInvalido(formularioInvalidoParam){
    this.formularioInvalido=formularioInvalidoParam;
  }

  limpiarConsultar(){
    this.consultar=false;
    this.consultarVerConcepto=false;
    this.consultarVerDescargar=false;
  }

  asignarConsultar(consultarParam){
    this.consultar=consultarParam;
  }

  asignarConsultarVerConcepto(consultarVerConceptoParam){
    this.consultarVerConcepto=consultarVerConceptoParam;
  }

  asignarConsultarVerDescargar(consultarVerDescargarParam){
    this.consultarVerDescargar=consultarVerDescargarParam;
  }

  
  // Cargar listas (Operadores - Peridos)
  public obtenerDepartamentos() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerDepartamentos)
    .pipe(catchError(this.errorHandler));    
  }

  // Cargar listas (Operadores - Peridos)
  public obtenerTiposDocumentosIndentidad() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerTiposDocumentosIndentidad)
    .pipe(catchError(this.errorHandler));    
  }
  // Cargar listas (Operadores - Peridos)
  public ObtenerPaises() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerPaises)
    .pipe(catchError(this.errorHandler));    
  }

  // Cargar listas (Operadores - Peridos)
  public ObtenerTiposBasPersonas() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerTiposBasPersonas)
    .pipe(catchError(this.errorHandler));    
  }
  // Cargar listas (Operadores - Peridos)
  public ObtenerFinesExportacion() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerFinesExportacion)
    .pipe(catchError(this.errorHandler));    
  }

  // Cargar listas (Operadores - Peridos)
  public ObtenerTiposPermanencia() {
    return this.http.get<ReturnModelLista>(this.urlTramite.obtenerTiposPermanencia)
    .pipe(catchError(this.errorHandler));    
  }
  
  
  

  // Cargar listas (Operadores - Peridos)
  public obtenerMunicipiosPorDepartamentoId(departamentoId: string) {
    return this.http.get<ReturnModelObtenerMunicipios>(this.urlTramite.obtenerMunicipios+'?padreId='+departamentoId)
    .pipe(catchError(this.errorHandler));    
  }

  // Error petición
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


}
