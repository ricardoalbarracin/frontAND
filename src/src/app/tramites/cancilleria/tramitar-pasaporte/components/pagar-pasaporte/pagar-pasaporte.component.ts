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
  mostrarPSE: boolean;
  mostrarTC: boolean;
  mostrarPresencial: boolean;
  urlPSE: string = "";
  urlTC: string = "";

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer, private router:Router ) {  
    //Obtiene el string con la data de la solicitud.
    this.dataSolicitud = this.route.snapshot.paramMap.get('data');
    
    //Covierte en Json el string con la data de la solicitud
    var data = JSON.parse(this.dataSolicitud); 
    // var data = JSON.parse("{\"return\" : {  \"outDatosSolicitante\" : {    \"nombreCompleto\" : {      \"primerApellido\" : \"VELASQUEZ\",      \"primerNombre\" : \"ANA\",      \"segundoApellido\" : \"GIRALDO\",      \"segundoNombre\" : \"MARIA\"    },    \"numeroPersonal\" : \"1088253299\",    \"tipoDocumento\" : \"CC\"  },  \"outDetalleRespuesta\" : {    \"codigo\" : 1,    \"detalle\" : \"EXITO\",    \"mensaje\" : \"Su solicitud de pasaporte se ha registrado correctamente, el número de registro de su solicitud es 165005005004401.\"  },  \"outFormaPago\" : [ {    \"descripcion\" : \"EN LÍNEA <br /> A través de Pagos Seguros en línea - PSE\",    \"formaDePago\" : \"PSE\",    \"id\" : 116,    \"labelBoton\" : \"IR A PSE\",    \"referenciaUnicaPago\" : \"165005005004401\",    \"tipoFormaPago\" : \"EN_LINEA\",    \"url\" : \"https://tramites.cancilleria.gov.co/ApostillaLegalizacion/pago/inicioPagoPSE.aspx?refpago=165005005004401&metodoPago=PSE&fuente=govco&redirectUrl=xxx\"  } ],  \"outSolicitud\" : {    \"moneda\" : \"USD $\",    \"numeroSolicitud\" : \"165005005004401\",    \"oficina\" : \"C. MEXICO\",    \"tipoPasaporte\" : \"ORDINARIO 32 PÁGINAS\",    \"totalPagar\" : 110.00  }}}");
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

    this.mostrarPSE = data.return.outFormaPago.some(e => e.formaDePago === 'PSE');
    this.mostrarTC = data.return.outFormaPago.some(e => e.formaDePago === 'TC');
    this.mostrarPresencial = data.return.outFormaPago.some(e => e.formaDePago === 'PRESENCIAL');

    if(this.mostrarPSE){
      this.urlPSE = data.return.outFormaPago.find(e => e.formaDePago === 'PSE').url;
    }

    if(this.mostrarTC){
      this.urlTC = data.return.outFormaPago.find(e => e.formaDePago === 'TC').url;
    }

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
    this.router.navigate(["/cancilleria/pagoOnline", this.solicitud, "S", "PSE", "", "GOVCO", this.urlPSE]);
  }

  pagoTc() {
    this.router.navigate(["/cancilleria/pagoOnline", this.solicitud, "TC", "PSE", "", "GOVCO", this.urlTC]);
  }
}
