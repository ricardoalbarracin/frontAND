import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  autorizar:boolean = true;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  continuar(){
    this.router.navigate(['/mintrabajo/seleccionar']);
  }

  cancelar(){
    this.router.navigate(['/mintrabajo/']);
  }

  autoriza(){
    this.autorizar = !this.autorizar;
  }

}
