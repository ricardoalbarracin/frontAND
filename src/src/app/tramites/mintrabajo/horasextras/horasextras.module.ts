import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { HorasExttrasRoutingModule } from './horasexttras-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultatramiteModule } from './consultatramite/consultatramite.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelecciontramiteComponent } from './components/selecciontramite/selecciontramite.component';
import { DescripciontramiteComponent } from './radicartramite/components/descripciontramite/descripciontramite.component';
import { OrganizacionessindicalesComponent } from './radicartramite/components/organizacionessindicales/organizacionessindicales.component';
import { DireccionComponent } from '../sharedmintrabajo/components/direccion/direccion.component';
import { SubirarchivoComponent } from '../sharedmintrabajo/components/subirarchivo/subirarchivo.component';
import { DireccionmodalComponent } from './radicartramite/components/direccionmodal/direccionmodal.component';
import { DocumentostramiteComponent } from './radicartramite/components/documentostramite/documentostramite.component';
import { TramiteregistradoComponent } from './radicartramite/components/tramiteregistrado/tramiteregistrado.component';
import { DatosremitenteComponent } from './radicartramite/components/datosremitente/datosremitente.component';

@NgModule({
  declarations: [
    InicioComponent,
    PrincipalComponent,
    SelecciontramiteComponent,
    DescripciontramiteComponent,
    OrganizacionessindicalesComponent,
    DireccionComponent,
    DireccionmodalComponent,
    DocumentostramiteComponent,
    SubirarchivoComponent,
    TramiteregistradoComponent,
    DatosremitenteComponent
  ],
  imports: [
    CommonModule,
    HorasExttrasRoutingModule,
    SharedModule,
    ConsultatramiteModule,
    ReactiveFormsModule
  ],
  entryComponents:[DireccionComponent,DireccionmodalComponent,SubirarchivoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HorasextrasModule { }
