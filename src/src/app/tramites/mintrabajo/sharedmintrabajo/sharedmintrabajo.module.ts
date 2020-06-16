import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionComponent } from './components/direccion/direccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SubirarchivoComponent } from './components/subirarchivo/subirarchivo.component';


@NgModule({
  declarations: [DireccionComponent, SubirarchivoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],exports: [
    DireccionComponent,
    SubirarchivoComponent
  ]
})
export class SharedmintrabajoModule { }
