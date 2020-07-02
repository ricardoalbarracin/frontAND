import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pago-online',
  templateUrl: './pago-online.component.html',
  styleUrls: ['./pago-online.component.scss']
})

export class PagoOnlineComponent implements OnInit {
  numeroSolicitud: string;
  proceso: string;
  medioPago: string;
  codigoTramite: string;
  entidad: string;
  url: string = "http://pse.cancilleria.gov.co/ciudadano2016/pago/inicioPagoTC.aspx?t=";
  srcIframe: SafeResourceUrl;
  dataSolicitud: string;
  paramUrl: string;
  cargasIframe: number = 0;

  constructor(private router: ActivatedRoute, public sanitizer: DomSanitizer, private route: Router) {
    this.numeroSolicitud = this.router.snapshot.paramMap.get('numeroSolicitud');
    this.proceso = this.router.snapshot.paramMap.get('proceso');
    this.medioPago = this.router.snapshot.paramMap.get('medioPago');
    this.codigoTramite = this.router.snapshot.paramMap.get('codigoTramite');
    this.entidad = this.router.snapshot.paramMap.get('entidad');
    this.dataSolicitud = "<datos><numeroSolicitud>" + this.numeroSolicitud + "</numeroSolicitud><process>" + this.proceso + "</process><medioPago>" + this.medioPago + "</medioPago><codTramite>" + this.codigoTramite + "</codTramite><entidad>" + this.entidad + "</entidad></datos>";
    this.paramUrl = btoa(this.dataSolicitud).substring(31);
  }

  ngOnInit() {
    this.srcIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url + this.paramUrl);
  }

  validarSrc(){
    if(this.cargasIframe == 0){
    this.cargasIframe = 1;
    return;  
    }

    var contenedor = (<HTMLIFrameElement>document.getElementById('iframePasarela'));

    if((this.url + this.paramUrl) != contenedor.src){
      var solicitudId = contenedor.src.substr(-15);
      this.route.navigate(["/cancilleria/comprobantePagoPse",solicitudId]);
    }    
    
  }
}