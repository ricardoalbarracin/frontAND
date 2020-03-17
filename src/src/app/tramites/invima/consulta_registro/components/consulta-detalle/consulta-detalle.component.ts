import { Component, OnInit,NgModule } from '@angular/core';
import { InvimaUtilsService} from '../../services/invima-utils.service'
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {ConsultaDetalleATCHeader} from '../../models/consultaATC'

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styleUrls: ['./consulta-detalle.component.scss']
})
export class ConsultaDetalleComponent implements OnInit {

  public _expediente:string;
  public _group:string;

  constructor(private router: Router,private InvimaUtils:InvimaUtilsService,private _location: Location) {    
    this._expediente = this.router.getCurrentNavigation().extras.state.expediente;  
    this._group = this.router.getCurrentNavigation().extras.state.group;        
  }

   datos:ConsultaDetalleATCHeader;
   cantidad:string;
   consec:string;
   termino:string;
   cantidad_presentacionComercial:string;
   unidad_medida:string;
   cantidad_principioActivo:string;
   unidad_medida_principioActivo:string;
   mostrar_datos_interes_producto = true;

  ngOnInit() {
    if (this.InvimaUtils.tipoConsulta === 1) {
     this.invocarDetalleRegistroServicio();
    } else {
      this.invocarServicio();
    }
    (<HTMLInputElement> document.getElementById("buttonDescargar")).disabled = true;
  }

  ngAfterViewInit(){
    this.setStep('4');
  }

  validarDatosInteres(registo:ConsultaDetalleATCHeader){
      return registo.formaFarmaceutica == null && registo.franja == null && registo.indicaciones == null && registo.contraindicaciones == null && registo.inserto == null && registo.vidaUtil == null && registo.condicionVenta == null && registo.generico == null;
  }

  invocarServicio() {
    this.InvimaUtils.getConsultaDetallexParam("ATC",this._expediente,"")
    .subscribe((data: ConsultaDetalleATCHeader) => {
        this.datos = data;
        this.InvimaUtils.setshowButtonDetail = true;
        this.mostrar_datos_interes_producto = !this.validarDatosInteres(data);        
      }, (error) => {
        this.InvimaUtils.setshowButtonDetail = false;
        console.error(error);
      }
    );
   }

   invocarDetalleRegistroServicio(){
    this.InvimaUtils.getConsultaDetallexParam("Registro",this._expediente, this._group)
    .subscribe((data: ConsultaDetalleATCHeader) => {
        this.datos = data;      
        this.InvimaUtils.setshowButtonDetail = true;
        this.mostrar_datos_interes_producto = !this.validarDatosInteres(data);
      }, (error) => {
        this.InvimaUtils.setshowButtonDetail = false;
        console.error(error);
      }
    );
   }


  descargarPDF(){
    this.InvimaUtils.getPDF(this.datos.numeroexpediente,this.datos.cdgproducto)
    .subscribe(
      (data) => {
        //const blob = new Blob([data], {type: 'application/pdf'});
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'caracteristicas_producto_' + this.datos.numeroexpediente + '.pdf';
        link.click();
        this.setStep('4');
      },
      (error) => {
        console.log(error);
        window.scroll(0, 0);
        //this.setStep('2');
        return;
      }
    );
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  retornarPagina(){
    this.InvimaUtils.setshowButtonDetail = false;
    this._location.back();
  }

}
