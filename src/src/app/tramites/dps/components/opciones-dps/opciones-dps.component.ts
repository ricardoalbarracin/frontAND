import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  jsonStrings  from '@stringResources/tramites/dps-strings.json';

@Component({
  selector: 'app-opciones-dps',
  templateUrl: './opciones-dps.component.html',
  styleUrls: ['./opciones-dps.component.scss']
})
export class OpcionesDpsComponent implements OnInit {

  public opcion = 'generar';
  public invalidForm = false;
  public mensajeMostrar = '';
  public activoMensajeSuccess = false;
  public activoMensajeSuccessValidado = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    }

  search() {
  }

  reset() {
    this.showError('0');
    this.changeSuccess(false);
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  changeValue() {
    this.reset();
    this.setStep("2");
  }

  showError(codigoError) {
    this.invalidForm = true;
    if (codigoError === '0') {
      this.invalidForm = false;
    } else if ( codigoError === '2') {
      this.mensajeMostrar =  jsonStrings.messages["search-empty-vinculacion"];
    } else if (codigoError === '3') {
      this.mensajeMostrar =  jsonStrings.messages["search-empty-verificacion"];
    }
  }

  changeSuccess(activo) {
    this.activoMensajeSuccess = activo;
    this.activoMensajeSuccessValidado = false;
  }

  changeSuccessValidado(activo) {
    this.activoMensajeSuccessValidado = activo;
    this.activoMensajeSuccess = false;
  }

}
