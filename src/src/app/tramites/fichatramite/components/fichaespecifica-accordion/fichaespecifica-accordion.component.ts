import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fichaespecifica-accordion',
  templateUrl: './fichaespecifica-accordion.component.html',
  styleUrls: ['./fichaespecifica-accordion.component.scss']
})
export class FichaespecificaAccordionComponent implements OnInit {

  @Input() data: any[];
  @Output() cargarDetalleMomento =  new EventEmitter<any>();
  @Output() cargarMomentosAudiencia =  new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  eventoTabAudiencia(data) {
    this.cargarMomentosAudiencia.emit(data);
  }

  dataDetalleMomentoAudiencia(audiencia: string , momento: number) {

    const data = {
      audiencia,
      momento
    };

    this.cargarDetalleMomento.emit(data);

  }

}
