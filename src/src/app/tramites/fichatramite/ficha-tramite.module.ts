import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FichaTramiteRoutingModule } from './ficha-tramite-routing.module';
import { GeneralComponent } from './components/general/general.component';
import { Routes, RouterModule } from '@angular/router';
import { FichaTramiteService } from './services/ficha-tramite.service';
import { HttpClientModule} from '@angular/common/http';
import { FichaEstandarComponent } from './components/fichaestandar/fichaestandar.component';
import { FichaEspecificaComponent } from './components/fichaespecifica/fichaespecifica.component';
import { FichaNoSuiteComponent } from './components/fichanosuite/fichanosuite.component';
import { EmbebidosComponent } from './components/embebidos/embebidos.component';
import { PuntosAtencionComponent } from './components/puntos-atencion-modal/puntos-atencion-modal.component';
import { RecursosModalComponent } from './components/recursos-modal/recursos-modal.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FichaespecificaHeaderComponent } from './components/fichaespecifica-header/fichaespecifica-header.component';
import { FichaespecificaAccordionComponent } from './components/fichaespecifica-accordion/fichaespecifica-accordion.component';
import { AccionVerificacionComponent } from './components/acciones/accion-verificacion/accion-verificacion.component';
import { AccionPagoComponent } from './components/acciones/accion-pago/accion-pago.component';
import { AccionSolicitudComponent } from './components/acciones/accion-solicitud/accion-solicitud.component';
import { AccionDocumentoComponent } from './components/acciones/accion-documento/accion-documento.component';
import { AccionFormularioComponent } from './components/acciones/accion-formulario/accion-formulario.component';
import { AccionExcepcionComponent } from './components/acciones/accion-excepcion/accion-excepcion.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: []
  }
];
@NgModule({
  declarations: [ GeneralComponent,
                  FichaEstandarComponent,
                  FichaEspecificaComponent,
                  PuntosAtencionComponent,
                  RecursosModalComponent,
                  EmbebidosComponent,
                  FichaNoSuiteComponent,
                  FichaespecificaHeaderComponent,
                  FichaespecificaAccordionComponent,
                  AccionVerificacionComponent,
                  AccionPagoComponent,
                  AccionSolicitudComponent,
                  AccionDocumentoComponent,
                  AccionFormularioComponent,
                  AccionExcepcionComponent],
  imports: [
    NgbModule,
    FichaTramiteRoutingModule,
    HttpClientModule,
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule
  ],
  entryComponents: [
    PuntosAtencionComponent,
    RecursosModalComponent
  ],
  providers: [FichaTramiteService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FichaTramiteModule { }
