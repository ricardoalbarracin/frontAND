import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramiteregistrado',
  templateUrl: './tramiteregistrado.component.html',
  styleUrls: ['./tramiteregistrado.component.scss']
})
export class TramiteregistradoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  aceptar(){
    this.router.navigate(['/mintrabajo']);
  }


}
