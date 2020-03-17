import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EstadoSolicitudForm }  from './estado-solicitud-form'

@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html',
  styleUrls: ['./estado-solicitud.component.scss']
})
export class EstadoSolicitudComponent implements OnInit {

  EstadoSolicitudForm: EstadoSolicitudForm;
  estadoSolicitudForm: FormGroup;
  nombresApellidos: string;
  tipoPasaporte: string;
  tipoDocumento: string;
  solicitud: string;
  numeroDocumento: string;
  oficina: string;
  srcEstado: string;
  estadoSolicitud: string;

  constructor(private router: ActivatedRoute) { 
    this.EstadoSolicitudForm = new EstadoSolicitudForm();
    this.nombresApellidos = this.router.snapshot.paramMap.get('nombresApellidos');
    this.tipoPasaporte = this.router.snapshot.paramMap.get('tipoPasaporte');
    this.tipoDocumento = this.router.snapshot.paramMap.get('tipoDocumento');
    this.solicitud = this.router.snapshot.paramMap.get('solicitud');
    this.numeroDocumento = this.router.snapshot.paramMap.get('numeroDocumento');
    this.oficina = this.router.snapshot.paramMap.get('oficina');
    this.estadoSolicitud = this.router.snapshot.paramMap.get('estadoSolicitud');
    //this.srcEstado = this.srcEstadoSolicitud(6);
    this.srcEstado = "formalizado";
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.estadoSolicitudForm = this.EstadoSolicitudForm.getForm();
    this.setStep("4")
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  srcEstadoSolicitud(codigoEstado: number) {
    var srcEstado = "";
    switch (codigoEstado) {
        case 1: {
            srcEstado = "assets/images/Estado-Pasaporte-1.svg";
            break;
        }
        case 2: {
            srcEstado = "assets/images/Estado-Pasaporte-2.svg";
            break;
        }
        case 3: {
            srcEstado = "assets/images/Estado-Pasaporte-3.svg";
            break;
        }
        case 4: {
            srcEstado = "assets/images/Estado-Pasaporte-4.svg";
            break;
        }
        case 5: {
            srcEstado = "assets/images/Estado-Pasaporte-5.svg";
            break;
        }
        default: {
            srcEstado = "assets/images/Estado-Pasaporte-6.svg";
            break;
        }
    }

    return srcEstado;
}

}
