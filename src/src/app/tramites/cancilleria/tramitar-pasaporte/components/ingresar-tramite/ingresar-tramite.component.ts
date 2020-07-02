import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-tramite',
  templateUrl: './ingresar-tramite.component.html',
  styleUrls: ['./ingresar-tramite.component.scss']
})
export class IngresarTramiteComponent implements OnInit {

  constructor(private route: Router) { 
    this.setStep("2")
  }

  ngOnInit() {

  }
  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }
  Consultar(){
      debugger;
      this.route.navigate(["/cancilleria/consultarEstado"]);
    }        
  
  Solicitar(){
    this.route.navigate(["/cancilleria/solicitarPasaporte"]);
  }
}
