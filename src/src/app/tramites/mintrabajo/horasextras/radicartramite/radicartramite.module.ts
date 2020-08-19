import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescripciontramiteComponent } from './components/descripciontramite/descripciontramite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { OrganizacionessindicalesComponent } from './components/organizacionessindicales/organizacionessindicales.component';
import { DireccionmodalComponent } from './components/direccionmodal/direccionmodal.component';
import { DatosremitenteComponent } from './components/datosremitente/datosremitente.component';
import { DocumentostramiteComponent } from './components/documentostramite/documentostramite.component';
import { SubirarchivoComponent } from '../../sharedmintrabajo/components/subirarchivo/subirarchivo.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { TramiteregistradoComponent } from './components/tramiteregistrado/tramiteregistrado.component';

@NgModule({
  declarations: [
    DescripciontramiteComponent,
    OrganizacionessindicalesComponent,
    DireccionmodalComponent,
    DatosremitenteComponent,
    DocumentostramiteComponent,
    SubirarchivoComponent,
    TramiteregistradoComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadicartramiteModule { }
