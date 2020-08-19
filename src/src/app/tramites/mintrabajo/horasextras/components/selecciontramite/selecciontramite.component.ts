import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-selecciontramite',
  templateUrl: './selecciontramite.component.html',
  styleUrls: ['./selecciontramite.component.scss']
})
export class SelecciontramiteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  consultar(){
    this.router.navigate(['/mintrabajo/consultar']);
  }

  radicar(){
    this.router.navigate(['/mintrabajo/descripcion']);
  }

}
