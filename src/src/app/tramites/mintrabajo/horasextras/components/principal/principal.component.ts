import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilsService } from '../../../sharedmintrabajo/utils/utils.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  autorizar:boolean = true;

  constructor(private router:Router, private utils:UtilsService) { }

  ngOnInit() {
  }

  continuar(){
    this.router.navigate(['/mintrabajo/seleccionar']);
    this.utils.estadoTramite('2');
  }

  cancelar(){
    this.router.navigate(['/mintrabajo/']);
  }

  autoriza(){
    this.autorizar = !this.autorizar;
  }

}
