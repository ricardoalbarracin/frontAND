import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConsultaRegistroForm } from '../components/consulta-registro/consulta-registro-form';

@Injectable({
  providedIn: 'root'
})
export class InvimaUtilsService {

  showError = false;
  showDetail = false;
  showButtonDetail = false;
  atcCode = "";
  tipoConsultaRegistro = "1";
  tipoConsulta = 1;
  valueConsultaRegistro = null;
  groupConsultaRegistro = null;
  path = 'invima/ConsultaRegistroSanitario/';
  obtenerSistemaOrganico = 'ListaSistemaOrganico';
  obtenerConsultaRegistroGrupo = 'ListaConsultaRegistroGrupo';
  obtenerGrupoFarmacologico = 'ListaGrupoFarmacologico/';
  obtenerSubGrupoFarmacologico = 'ListaSubGrupoFarmacologico/';
  obtenerSubGrupoQuimico = 'ListaSubGrupoQuimico/';
  obtenerSustancia = 'ListaSustancia/';
  obtenerSustanciaXNombre = "ListaSustanciaxNombre/";
  obtenerConsultaGeneralATC = "ConsultaGeneralATC/";
  obtenerSustanciaXATC = "ListaSustanciaxATC/"
  obtenerConsultaDetalleATC = "ConsultaDetalleATC/";
  listaConsultaRegistroGrupoData:any;
  
  formRegistro: ConsultaRegistroForm;
  formPrincipal: any;
  formConsultaAtc: any;

  public listaSistemaOrganicoData : any = [];
  public listaGrupoFarmacologicoData: any = [];
  public listaSubGrupoFarmacologicoData: any = [];
  public listaSubGrupoQuimicoData: any = [];
  public listaSustanciaData: any = [];
  public descripcionAtc:any ='sustancia';

  get getError() { return this.showError; }
  set setError(val:any){ this.showError = val;}

  get getDescripcionAtcData() { return this.descripcionAtc; }
  set setDescripcionAtcData(val:any){ this.descripcionAtc = val;}

  get getListaSistemaOrganicoData() { return this.listaSistemaOrganicoData; }
  set setListaSistemaOrganicoData(val:any){ this.listaSistemaOrganicoData = val;}

  get getListaGrupoFarmacologicoData() { return this.listaGrupoFarmacologicoData; }
  set setListaGrupoFarmacologicoData(val:any){ this.listaGrupoFarmacologicoData = val;}


  get getListaSubGrupoFarmacologicoData() { return this.listaSubGrupoFarmacologicoData; }
  set setListaSubGrupoFarmacologicoData(val:any){ this.listaSubGrupoFarmacologicoData = val;}
  
  get getListaSubGrupoQuimicoData() { return this.listaSubGrupoQuimicoData; }
  set setListaSubGrupoQuimicoData(val:any){ this.listaSubGrupoQuimicoData = val;}


  get getListaSustanciaData() { return this.listaSustanciaData; }
  set setListaSustanciaData(val:any){ this.listaSustanciaData = val;}


  get getshowButtonDetail() { return this.showButtonDetail; }
  set setshowButtonDetail(val:any){ this.showButtonDetail = val;}

  get getListaConsultaRegistroGrupoData() { return this.listaConsultaRegistroGrupoData; }
  set setListaConsultaRegistroGrupoData(val:any){ this.listaConsultaRegistroGrupoData = val;}
  
  get getFormConsultaAtc() { return this.formConsultaAtc; }
  set setFormConsultaAtc(val:any){ this.formConsultaAtc = val;}

  get getFormRegistro() { return this.formRegistro; }
  set setFormRegistro(val:any){ this.formRegistro = val;}

  get getFormPrincipal() { return this.formPrincipal; }
  set setFormPrincipal(val:any){ this.formPrincipal = val;}

  get getDetail() { return this.showDetail; }
  set setDetail(val:any){ this.showDetail = val;}

  get getatcCode() { return this.atcCode; }
  set setatcCode(val:any){ this.atcCode = val;}  

  get getTipoConsulta() { return this.tipoConsulta; }
  set setTipoConsulta(val:any){ this.tipoConsulta = val;}  
  
  get getTipoConsultaRegistro() { return this.tipoConsultaRegistro; }
  set setTipoConsultaRegistro(val:any){ this.tipoConsultaRegistro = val;}  

  get getValueConsultaRegistro() { return this.valueConsultaRegistro; }
  set setValueConsultaRegistro(val:any){ this.valueConsultaRegistro = val;}  

  get getGroupConsultaRegistro() { return this.groupConsultaRegistro; }
  set setGroupConsultaRegistro(val:any){ this.groupConsultaRegistro = val;}  

  getListaSistemaOrganico() {
    return this.http.get(this.path + this.obtenerSistemaOrganico, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaConsultaRegistroGrupo() {
    return this.http.get(this.path + this.obtenerConsultaRegistroGrupo, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaGrupoFamacologico(value:string) {
    return this.http.get(this.path + this.obtenerGrupoFarmacologico + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaSubGrupoFarmacologico(value:string) {
    return this.http.get(this.path + this.obtenerSubGrupoFarmacologico + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  getListaSubGrupoQuimico(value:string) {
    return this.http.get(this.path + this.obtenerSubGrupoQuimico + value, {
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  // getListaSustancia(value:string) {
  //   return this.http.get(this.path + this.obtenerSustancia + value, {
  //     headers: new HttpHeaders().append("angular-show-loading", "true")
  //   });
  // }

  // getListaSustanciaXNombre(value:string) {
  //   return this.http.get(this.path + this.obtenerSustanciaXNombre + value, {
  //     headers: new HttpHeaders().append("angular-show-loading", "true")
  //   });
  // }

  getListaSustanciasXParam(value:string, param:string) {
    if(param == "atc"){
      return this.http.get(this.path + this.obtenerSustanciaXATC + value, {
        headers: new HttpHeaders().append("angular-show-loading", "true")
      });
    }
    else if(param == "sustancia"){
      return this.http.get(this.path + this.obtenerSustanciaXNombre + value, {
        headers: new HttpHeaders().append("angular-show-loading", "true")
      });
    }
    else if (param == "lista_sustancia"){
      return this.http.get(this.path + this.obtenerSustancia + value, {
        headers: new HttpHeaders().append("angular-show-loading", "true")
      });
    }
    
  }

  getConsultaGeneralATC(value:string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .append("angular-show-loading", "true");
    return this.http.get(this.path + this.obtenerConsultaGeneralATC + value, {headers});
  }

  // getListaSustanciaXATC(value:string) {
  //   return this.http.get(this.path + this.obtenerSustanciaXATC + value, {
  //     headers: new HttpHeaders().append("angular-show-loading", "true")
  //   });
  // }  

  getConsultaRegistro(tipoConsultaRegistro:string, group:string, value:string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .append("angular-show-loading", "true");

    return this.http.get(`invima/ConsultaRegistroSanitario/ConsultaRegistro/${tipoConsultaRegistro}?group=${group}&value=${value}`, {headers});
  }

  // getConsultaDetalleATC(value:string) {
  //   return this.http.get(this.path + this.obtenerConsultaDetalleATC + value, {
  //     headers: new HttpHeaders().append("angular-show-loading", "true")
  //   });
  // }
  
  // getConsultaDetalleRegistro(value:string, group:string) {
  //   const headers = new HttpHeaders().set("Content-Type", "application/json")
  //   .append("angular-show-loading", "true");

  //   return this.http.get(`invima/ConsultaRegistroSanitario/ConsultaDetalleRegistro/${value}/group/${group}`,
  //    {headers});
  // }

  getConsultaDetallexParam(tipoConsulta: string, value: string, group: string) {
    if (tipoConsulta == "ATC") {
      return this.http.get(this.path + this.obtenerConsultaDetalleATC + value, {
        headers: new HttpHeaders().append("angular-show-loading", "true")
      });
    }
    else if (tipoConsulta == "Registro") {
      const headers = new HttpHeaders().set("Content-Type", "application/json")
        .append("angular-show-loading", "true");

      return this.http.get(`invima/ConsultaRegistroSanitario/ConsultaDetalleRegistro/${value}/group/${group}`,
        { headers });
    }
  }

  getPDF(nroexpediente:string,cdgproducto:string) {
    return this.http.get(`invima/ConsultaRegistroSanitario/DescargarPDF/${nroexpediente}/group/${cdgproducto}`, {
      responseType: 'blob',
      headers: new HttpHeaders().append("angular-show-loading", "true")
    });
  }

  constructor(private http: HttpClient) { }
}
