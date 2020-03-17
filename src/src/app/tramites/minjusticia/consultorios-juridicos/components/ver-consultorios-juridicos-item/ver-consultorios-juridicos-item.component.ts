import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultorioJuridico } from '../../models/ConsultorioJuridico';

@Component({
  selector: 'app-ver-consultorios-juridicos-item',
  templateUrl: './ver-consultorios-juridicos-item.component.html',
  styleUrls: ['./ver-consultorios-juridicos-item.component.scss']
})
export class VerConsultoriosJuridicosItemComponent implements OnInit {

  constructor() { }

  @Input() consultorio: ConsultorioJuridico;

  @Input() showButton: boolean;

  @Output() clickEvent: EventEmitter<ConsultorioJuridico> = new EventEmitter();

  ngOnInit() {
  }

  select() {
    this.clickEvent.emit(this.consultorio);
  }
}