import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  public usserLogged: UserModel;
  private tiposDocumento = new Array();  
  private estadosCredito = new Array();
  

  constructor() {

    this.tiposDocumento['CC'] ='Cédula de Ciudadanía';
    this.tiposDocumento['CD'] ='Carné Diplomatico';
    this.tiposDocumento['E'] ='Cédula de Extranjería';
    this.tiposDocumento['NI'] ='Nit Personas Naturales';
    this.tiposDocumento['NU'] ='Número Único de Identificación Personal NUIP';
    this.tiposDocumento['PA'] ='Pasaporte';
    this.tiposDocumento['TI'] ='Tarjeta de Identidad';

    this.estadosCredito['1'] = 'Vigente';
    this.estadosCredito['4'] = 'Castigado';
    this.estadosCredito['9'] = 'Suspenso';

   }

  setUserLoggedIn(user: UserModel) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUserFna', JSON.stringify(user));

  }

  getUserLoggedIn() {
  return JSON.parse(localStorage.getItem('currentUserFna'));
  }

  getDescTipoDocumento(tipoDoc: string){
    
    return this.tiposDocumento[tipoDoc];

  }

  getDescEstadoCredito(estado: string){
    
    return this.estadosCredito[estado];

  }
}
