import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripciontramiteComponent } from './components/descripciontramite/descripciontramite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { OrganizacionessindicalesComponent } from './components/organizacionessindicales/organizacionessindicales.component';
import { DireccionmodalComponent } from './components/direccionmodal/direccionmodal.component';

@NgModule({
  declarations: [DescripciontramiteComponent, OrganizacionessindicalesComponent, DireccionmodalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadicartramiteModule { }
