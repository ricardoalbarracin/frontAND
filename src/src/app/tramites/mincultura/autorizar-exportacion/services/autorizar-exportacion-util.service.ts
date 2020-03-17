import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizarExportacionUtilService {

  paso:any;
  pasoIngresar:any;
  formularioInvalido:any;
  consultar:any;
  consultarVerConcepto:any;
  consultarVerDescargar:any;
  llega:any;

  constructor() {}

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

}
