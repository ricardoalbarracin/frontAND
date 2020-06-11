import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionComponent } from './components/direccion/direccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [DireccionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],exports: [
    DireccionComponent
  ]
})
export class SharedmintrabajoModule { }
