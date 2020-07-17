import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './components/general/general.component';
import { IngresarTramiteComponent } from './components/ingresar-tramite/ingresar-tramite.component';
import { AutorizarExportacionRoutingModule } from './autorizar-exportacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { IngresarSolicitudComponent } from './components/ingresar-solicitud/ingresar-solicitud.component';
import { IngresarObrasComponent } from './components/ingresar-obras/ingresar-obras.component';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
import { ModalComponent } from './components/modal/modal.component';
import { NumberDirective } from './services/NumberDirective';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: "",
    component: GeneralComponent,
    children: []
  }
];

@NgModule({
  declarations: [IngresarTramiteComponent, IniciarSesionComponent, GeneralComponent, IngresarSolicitudComponent, IngresarObrasComponent, ConsultarSolicitudComponent, ModalComponent, NumberDirective, InicioComponent],
  imports: [
    CommonModule,
    AutorizarExportacionRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutorizarExportacionModule { }
