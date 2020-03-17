import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultorioJuridico, HorarioConsultorio } from '../../models/ConsultorioJuridico';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import  jsonMessages  from '@stringResources/tramites/consultorios-juridicos.json';

@Component({
  selector: 'app-ver-consultorios-juridicos-modal',
  templateUrl: './ver-consultorios-juridicos-modal.component.html',
  styleUrls: ['./ver-consultorios-juridicos-modal.component.scss']
})
export class VerConsultoriosJuridicosModalComponent implements OnInit {

  @Input() consultorio: ConsultorioJuridico;

  @Output() selectEvent: EventEmitter<ConsultorioJuridico> = new EventEmitter();

  horarios: HorarioConsultorio[];

  itemSelected: HorarioConsultorio;

  noResult: boolean = false;

  fechaDisponibilidad: string;

  messages: any = {
    title: "",
    message: "",
    type: ""
  }

  defaultUbication: any = {
    latitude: 4.6097102,
    longitude: -74.081749
  }

  defaultMessages: any;

  btnClass = {
    default: "btn btn-round btn-middle form-control",
    selected: "btn btn-round btn-high form-control"
  }

  constructor(
    private service: MinjusticiaUtilsService,
    private activeModal: NgbActiveModal
  ) {    
    this.defaultMessages = {
      noDisponibilidad: jsonMessages.messages["ver-consultorios-juridicos"]["no-disponibilidad"],
      error: jsonMessages.messages["ver-consultorios-juridicos"].error,
      title: jsonMessages.messages["ver-consultorios-juridicos"]["error-title"],
    }
  }

  ngOnInit() {  
    this.getQueryParams();
    this.getListConsultorios();
    this.showConsultorioLocation();
  }

  getListConsultorios(): void {
    this.service.getHorariosConsultorio(this.consultorio.id).subscribe(
      (data) => { 
        if(data["success"] === true){
          this.horarios = data["result"];
          if(this.horarios.length === 0){ 
            this.showMessage("warning", this.defaultMessages.title, this.defaultMessages.noDisponibilidad);
            this.noResult = true;
          }
        }else {
          const errorMessage = data["message"] != undefined && data["message"].length > 0 ? data["message"] : this.defaultMessages.error;
          this.showMessage("error", this.defaultMessages.title, errorMessage); 
          this.noResult = true;
        }
      },
      (error) => {
        this.showMessage("error", this.defaultMessages.title, this.defaultMessages.error); 
        this.noResult = true;
      }
    );
  }

  showConsultorioLocation(): void {
    if(this.consultorio.ConsultorioLatidud != null  && this.consultorio.ConsultorioLatidud != 0 
      && this.consultorio.ConsultorioLongitud != null  && this.consultorio.ConsultorioLongitud != 0){
        this.defaultUbication.latitude = this.consultorio.ConsultorioLatidud;
        this.defaultUbication.longitude = this.consultorio.ConsultorioLongitud;
    }
  }

  getQueryParams(): void {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const params = this.service.getQueryParams();

    this.fechaDisponibilidad = params.fecha.toLocaleDateString('es-ES', options);
  }

  selectItem(horario: HorarioConsultorio) {
    this.itemSelected = horario;
  }

  getItemClass(horario: HorarioConsultorio) {
    if (this.itemSelected != undefined){
      if (horario.id == this.itemSelected.id){
        return this.btnClass.selected
      }
    }
    return this.btnClass.default;
  }

  agendar() {
    if (this.itemSelected != undefined){
      this.consultorio.horario = this.itemSelected;
      this.selectEvent.emit(this.consultorio);
      this.activeModal.close();
    }
  }

  showMessage(type, title, message): void {
    this.messages = {
      type : type,
      title: title,
      message: message
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
