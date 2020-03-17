import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PagarPasaporteForm }  from './pagar-pasaporte-form'
import { DataPagoPasaporteModel } from '../../models/dataPagoPasaporteModel';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pagar-pasaporte',
  templateUrl: './pagar-pasaporte.component.html',
  styleUrls: ['./pagar-pasaporte.component.scss']
})
export class PagarPasaporteComponent implements OnInit {

  PagarPasaporteForm: PagarPasaporteForm;
  pagoPasaporteForm: any;
  dataPagoPasaporteModel:DataPagoPasaporteModel;
  dataSolicitud: string;
  nombresApellidos: string;
  tipoPasaporte: string;
  tipoDocumento: string;
  solicitud: string;
  numeroDocumento: string;
  oficina: string;
  nacionalidad: string;
  moneda: string;
  totalPago: Int16Array;
  centavos: string;   

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private router:Router ) {  
    //Obtiene el string con la data de la solicitud.
    this.dataSolicitud = this.route.snapshot.paramMap.get('data');
    
    //Covierte en Json el string con la data de la solicitud
    var data = JSON.parse(this.dataSolicitud); 

    //Mapeo de datos de la solicitud.
    var nombres = data.return.outDatosSolicitante.nombreCompleto;
    this.nombresApellidos = nombres.primerNombre + " " + nombres.segundoNombre + " " + nombres.primerApellido + " " + nombres.segundoApellido;
    this.tipoPasaporte = data.return.outSolicitud.tipoPasaporte;
    this.tipoDocumento = data.return.outDatosSolicitante.tipoDocumento;
    this.solicitud = data.return.outSolicitud.numeroSolicitud;
    this.numeroDocumento = data.return.outDatosSolicitante.numeroPersonal;
    this.oficina = data.return.outSolicitud.oficina;
    this.nacionalidad = "Colombiana";
    this.moneda = data.return.outSolicitud.moneda;
    this.totalPago = data.return.outSolicitud.totalPagar;
    this.centavos = ".00"

    //Renderiza el formulario.
    this.PagarPasaporteForm = new PagarPasaporteForm();
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.pagoPasaporteForm = this.PagarPasaporteForm.getForm();
    this.setStep("2");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  pagoPse() {
    this.router.navigate(["/cancilleria/pagoOnline",this.solicitud,"S","PSE","","GOVCO"]);
  }

  pagoTc() {                               
   this.router.navigate(["/cancilleria/pagoOnline",this.solicitud,"TC","PSE","","GOVCO"]);
 }
}
