import { Component, OnInit } from '@angular/core';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { Router } from '@angular/router';
import { ConsultorioJuridico } from '../../models/ConsultorioJuridico';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.scss']
})
export class DetalleCitaComponent implements OnInit {

  consultorio: ConsultorioJuridico;
  fecha: string;
  username: string;
  document: string;
  error: boolean = false;
  messages: any = {
    defaultMessage: "",
    currentMessage: ""
  }

  constructor(
    private tramiteService: MinjusticiaUtilsService, 
    private router: Router,
    private authService: AgendamientoAuthenticationService) { }

  ngOnInit() {
    this.validateUserlogged();
    this.loadConsultorio();
    this.loadPersonalInformation();
    this.tramiteService.setTramiteStep("4");
  }

  //Verifica si el usuario tiene una sesión activa
  validateUserlogged(): void {
    //Verifica si tengo un token activo para realizar la cita
    const token = this.authService.getValueToken();
    if (token === ""){
      this.resetValues();
      return;
    }
  }

  //Realiza la solicitud para obtener los datos personales
  loadPersonalInformation(): void {
    const username = this.authService.getUsername();

    this.authService.getUserInformation(username).subscribe(
      (data) => {
        if (data["success"]){
          this.buildPersonalInformation(data["result"]);
        }else {
          this.showErrorMessage(data["message"]);
        }
      },
      (error) => this.showErrorMessage(this.messages.defaultMessage)
    );
  }

  //Carga la información de la persona en la vista
  buildPersonalInformation(data): void {
    this.username =  data.usuarioPrimerNombre + " " 
      + this.validateName(data.usuarioSegundoNombre)
      + this.validateName(data.usuarioPrimerApellido)
      + this.validateName(data.usuarioSegundoApellido);

    this.document = data.usuarioIdentificacion;
  }

  //Muestra mensaje de notificación de error al cargar los datos personales
  showErrorMessage(message: string): void {
    this.error = true;
    this.messages.currentMessage = 
      (message == undefined || message == "") 
      ? this.messages.defaultMessage: message;
  }

  //Valida cadena de texto de nombre si existe
  validateName(name): string {
    if (name == undefined || name == null || name == ""){
      return "";
    }

    return name + " ";
  }

  //Carga la información del consultorio en la vista
  loadConsultorio(): void {
    this.consultorio = this.tramiteService.getConsultorioSelected();
    if (this.consultorio == undefined){
      this.resetValues();
      return;
    }

    let params = this.tramiteService.getQueryParams();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.fecha = params.fecha.toLocaleDateString('es-ES', options);
  }

  //Continua con el proceso de agendamiento
  continue(): void {
    this.router.navigate([this.tramiteService.getTramiteUrl() +'/historico-citas']);
  }

  //Elimina los valores temporales y devuelve al inicio del trámite
  private resetValues(): void {
    this.authService.logOut();
    this.tramiteService.resetQueryParams();
    this.router.navigate([this.tramiteService.getTramiteUrl()]);
  }
}
