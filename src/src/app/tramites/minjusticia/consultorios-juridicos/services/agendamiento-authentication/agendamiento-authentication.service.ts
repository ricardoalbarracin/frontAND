import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginMinjusticiaModel } from '../../models/LoginMinjusticiaModel';
import { ActiveTokenModel } from  '../../models/ActiveTokenModel';
import { map } from 'rxjs/operators';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';

export class AgendamientoAuthenticationService {
  
  private baseUrl: string = "AutenticacionMinjusticia/";
  private loginUrl: string = "Login";
  private userInformationUrl: string = "ObtenerDatosUsuario?username=";
  private saveUserUrl: string = "RegistrarUsuario";
  private restorePasswordRequestUrl: string = "SolicitudRecuperacionContrasena";
  private restorePasswordUrl : string = "RecuperarContrasena";

  constructor(private http: HttpClient, private notificationService: ConfirmModalService) { }

  //Inicia sesión en minjusticia
  login(data: LoginMinjusticiaModel) {
    return this.http.post(this.baseUrl + this.loginUrl, data, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    }).pipe(
      map( response => {
        if(response["success"] == true) {
          return this.setUserToken(response["result"]);
        }
        return response["success"];
      })
    );
  }

  getUserInformation(username: string) {
    return this.http.get(this.baseUrl + this.userInformationUrl + username, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  //Realiza el registro de usuario y ciudadano
  saveUser(data: any) {
    return this.http.post(this.baseUrl + this.saveUserUrl, data, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  //Realiza el la solicitud de recuperación de contrasena
  restorePasswordRequest(username: string) {
    return this.http.post(this.baseUrl + this.restorePasswordRequestUrl, { UsuarioIdentificacion : username }, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  restorePassword(username: string, password: string, passwordAgain: string, auth: string){
    const data: any = {
      UsuarioIdentificacion: username,
      Contrasena: password,
      ContrasenaVerificacion: passwordAgain,
      CodigoRecuperacion: auth
    }

    return this.http.post(this.baseUrl + this.restorePasswordRequestUrl, data, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('angular-show-loading', 'true')
    });
  }

  //Guarda el token de minjusticia y calcula la fecha de expiración
  setUserToken(tokenModel: any): boolean {
    if(tokenModel != undefined ){
      const secondsLeft = parseInt(tokenModel["expires_in"]);
      let expireDate = new Date();
      expireDate.setSeconds(expireDate.getSeconds() + secondsLeft);

      const token: ActiveTokenModel = {
        token : tokenModel["access_token"],
        userName: tokenModel["username"],
        expireToken: expireDate 
      }
      localStorage.setItem('currentToken-Minjusticia', JSON.stringify(token));
      return true;
    }
    return false;
  }

  //verifica si el token aun está vigente
  getUserToken() : boolean {
    let token = JSON.parse(localStorage.getItem('currentToken-Minjusticia')) as ActiveTokenModel;
    
    if(token != undefined && token != null) {
      const currentDate = new Date();
      if(currentDate < new Date(token.expireToken)){ 
        return true;
      }
    }

    return false;
  }

  getUsername(): string {
    let token = JSON.parse(localStorage.getItem('currentToken-Minjusticia')) as ActiveTokenModel;
    if(this.getUserToken()) {
      return token.userName;
    }

    return "";
  }

  //obtiene el valor del token activo o en caso de estar vencido, devuelve un string vaciío
  getValueToken(): string {
    let token = JSON.parse(localStorage.getItem('currentToken-Minjusticia')) as ActiveTokenModel;
    if(this.getUserToken()) {
      return token.token;
    }

    return "";
  }

  logOut(): void{
    localStorage.removeItem('currentToken-Minjusticia');
  }

  //Muestra una notificación para indicar que la sesión se venció
  showTokenExpiredNotification(method: any): void {
    this.notificationService.openNotificationDialog(
      "La sesión ha expirado",
      "La sesión actual expiró, inicie sesión nuevamente",
      "warning",
      method
    );
  }

}
