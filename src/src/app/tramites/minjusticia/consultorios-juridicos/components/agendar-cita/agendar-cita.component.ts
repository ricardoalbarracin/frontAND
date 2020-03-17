import { Component, OnInit } from '@angular/core';
import { ConsultorioJuridico, QueryParams } from '../../models/ConsultorioJuridico';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { Router } from '@angular/router';
import { AgendamientoAuthenticationService } from '../../services/agendamiento-authentication/agendamiento-authentication.service';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginMinjusticiaModalComponent } from '../login-minjusticia-modal/login-minjusticia-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  jsonMessages  from '@stringResources/tramites/consultorios-juridicos.json';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {

  consultorio: ConsultorioJuridico;
  filtros: QueryParams;
  fecha: string;
  temasList: SelectListItemModel[];
  agenda: FormGroup;
  invalidForm: boolean = false;
  message: string;
  defaultMessage: string;
  error: boolean;
  tramiteUrl: string;

  constructor(
    private service: MinjusticiaUtilsService,
    private router: Router,
    private authService: AgendamientoAuthenticationService,
    private tramiteService: MinjusticiaUtilsService,
    private modalService: NgbModal
  ) {
    this.defaultMessage = jsonMessages.messages["crear-cita"]["default-error"];
    this.tramiteUrl = this.service.getTramiteUrl();
   }

  ngOnInit() {
    this.getTemasList();
    this.setValues();
    this.buildForm();
  }

  buildForm (): void {
    this.agenda = new FormGroup({
      tema: new FormControl('', Validators.required)
    });
  }

  //Realiza la carga inicial de los elementos
  setValues(): void {
    let consultorio = this.service.getConsultorioSelected();  
    if (consultorio == undefined){
      this.router.navigate([this.tramiteUrl + "/listarConsultorios"]);
      return;
    }

    this.filtros = this.service.getQueryParams();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.fecha = this.filtros.fecha.toLocaleDateString('es-ES', options);
    this.consultorio = consultorio;
  }

  //Obtiene el listado de temas disponibles
  getTemasList(): void {
    this.tramiteService.getTemas().subscribe(
      (data) => { 
        if(data["success"] === true){
          this.temasList = data["result"];
        }
      }
    );
  }

  //Inicia proceso de guardado
  save() {
    this.error = false;
    this.invalidForm = false;
    if(!this.agenda.valid) {
      this.invalidForm = true;
      return;
    }
    const value = this.getCitaValue();
    this.saveTemporalData(value);

    //Verifica si tengo un token activo para realizar la cita
    this.pushLoginModal(value);
  }  

  //Obtiene el valor de la cita solicitada
  getCitaValue() : any {
    return {
      DisponibilidadId: this.consultorio.horario.id,
      TemaConsultaId: this.agenda.value.tema.value,
      Username: ""
    }
  }

  //Actualiza la información del consultorio con los valores registrados
  saveTemporalData(cita) : void {
    this.consultorio.Tema = this.agenda.value.tema.text;
    this.service.setConsultorio(this.consultorio);
  }

  //Llama la ventana emergente para hacer el inicio de sesión en minjusticia
  pushLoginModal(value: any): void {
    let modal = this.modalService.open(LoginMinjusticiaModalComponent, { size: 'lg', 
      backdrop: "static",
      keyboard: false
    });

    modal.componentInstance.successLoginEvent.subscribe((response) => {
      this.sendData(response, value);
    });
  }

  //Envía la petición para guardar la información
  sendData(doSend: boolean, model: any): void {
    if (doSend){
      model.Username = this.authService.getUsername();

      let token = this.authService.getValueToken();
      this.service.setCita(model, token).subscribe(
        (data) => { 
          if(data["success"] === true){
            this.service.setTramiteStep("4");
            this.router.navigate([this.tramiteUrl +"/detallecita"]);
          }else {
            this.message = this.defaultMessage;
            this.error = true;
          }
        },
        (error) => {
          this.message = this.defaultMessage;
          this.error = true;
        }
      );
    }
  }

  //Cancela selección de tema y de horario para agendar 
  cancel() {
    this.consultorio.Tema = null;
    this.consultorio.horario = null;

    this.service.setConsultorio(this.consultorio);
    this.router.navigate([this.tramiteUrl + "/listarConsultorios"]);
  }
}
