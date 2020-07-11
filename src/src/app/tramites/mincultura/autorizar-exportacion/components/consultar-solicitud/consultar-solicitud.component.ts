import { Solicitudsalidaobra } from './../../models/solicitudsalidaobra';
import { Radicacion } from './../../../../sic/denuncia-infraccion/models/sic-models';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestModelObtenerSolicitudPorNroConsecutivo } from '../../models/requestmodelobtenersolicitudpornroconsecutivo';
import { ReturnModelObtenerSolicitudPorNroConsecutivo } from '../../models/returnmodelobtenersolicitudpornroconsecutivo';
import { ConsultarSolicitudForm } from './consultar-solicitud.form';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styleUrls: ['./consultar-solicitud.component.scss']
})
export class ConsultarSolicitudComponent implements OnInit {
  seleccionForm: FormGroup;
  seleccionSolucionForm: ConsultarSolicitudForm;
  invalidForm: boolean = false;
  items: Array<any> = [];
  consultarVerConcepto: boolean = false;
  verInformacionDescargar: boolean = false;
  mensajeConsultaSinResultados: boolean = false;

  constructor(public formBuilder: FormBuilder, public service: AutorizarExportacionUtilService) {

  }

  establecerAreaNotificaciones(value:string){
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', value);
  }

  consultar() {
    if (this.seleccionSolucionForm.isValid()) {
      this.service.ConsultarSolicitudxRadicado(this.seleccionForm.value.numero_radicado).subscribe((response:ReturnModelObtenerSolicitudPorNroConsecutivo) => {
        debugger;
        if (response.result.solicitudSalidaObra)
          {
            this.items.push(response.result.solicitudSalidaObra);
            this.mensajeConsultaSinResultados = false;
            this.establecerAreaNotificaciones('4');
          }
        else
          this.mensajeConsultaSinResultados = true;
      }, error => {
        console.error(error);
      });

    } else {
      this.invalidForm = true;
      return;
    }
  }

  verResultado() {
    this.consultarVerConcepto = !this.consultarVerConcepto;
  }

  limpiarCampos() {
    this.seleccionForm.reset();
    this.invalidForm = false;
    this.verInformacionDescargar = false;
    this.consultarVerConcepto = false;
    this.items = [];
  }

  verEditar() {

  }

  verDescargar() {
    this.verInformacionDescargar = !this.verInformacionDescargar;
  }

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultarSolicitudForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

}
