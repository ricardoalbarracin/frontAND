import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-inicio-opcion-solucion',
  templateUrl: './inicio-opcion-solucion.component.html',
  styleUrls: ['./inicio-opcion-solucion.component.scss']
})
export class InicioOpcionSolucionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ConsultarEstado(){
    this.router.navigate(['/sic/consulta_estado_denuncia']);
  }

  Denunciar(){
    this.router.navigate(['/sic/iniciar_sesion']);
  }
}
