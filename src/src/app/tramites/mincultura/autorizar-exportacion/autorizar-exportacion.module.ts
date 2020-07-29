import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './components/general/general.component';
import { IngresarTramiteComponent } from './components/ingresar-tramite/ingresar-tramite.component';
import { AutorizarExportacionRoutingModule } from './autorizar-exportacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { IngresarSolicitudComponent } from './components/ingresar-solicitud/ingresar-solicitud.component';
import { IngresarObrasComponent } from './components/ingresar-obras/ingresar-obras.component';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
import { ModalComponent } from './components/modal/modal.component';
import { NumberDirective } from './services/NumberDirective';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { InicioComponent } from './components/inicio/inicio.component';
import { AutorizarExportacionComponent } from './components/autorizar-exportacion/autorizar-exportacion.component';
import { IniciarComponent } from './components/iniciar/iniciar.component';

@NgModule({
  declarations: [
    IngresarTramiteComponent,
    IniciarSesionComponent,
    GeneralComponent,
    IngresarSolicitudComponent,
    IngresarObrasComponent,
    ConsultarSolicitudComponent,
    ModalComponent,
    NumberDirective,
    InicioComponent,
    AutorizarExportacionComponent,
    IniciarComponent
  ],
  imports: [
    CommonModule,
    AutorizarExportacionRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  entryComponents: [IniciarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutorizarExportacionModule { }
