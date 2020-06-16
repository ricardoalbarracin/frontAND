import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subirarchivo',
  templateUrl: './subirarchivo.component.html',
  styleUrls: ['./subirarchivo.component.scss']
})
export class SubirarchivoComponent implements OnInit {

  selectFile: File;

  constructor() { }

  ngOnInit() {
  }

  SeleccionarArchivo(event) {
    this.selectFile = event.target.files[0];
  }

  CargarArchivo() {
      alert('Archivo cargado con exito');
      console.log('Cargando ' + this.selectFile.name);
  }
}
