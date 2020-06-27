import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionComponent } from './components/direccion/direccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SubirarchivoComponent } from './components/subirarchivo/subirarchivo.component';
import { UtilsService } from './utils/utils.service';


@NgModule({
  declarations: [DireccionComponent, SubirarchivoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],exports: [
    DireccionComponent,
    SubirarchivoComponent,
    UtilsService
  ]
})
export class SharedmintrabajoModule { }
