import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MinsaludConsultaRoutingModule } from './minsalud-consulta-routing.module';
import { GeneralComponent } from './components/general/general.component';
import { PrestadoresFiltroComponent } from './components/prestadores/prestadores-filtro/prestadores-filtro.component';
import { SedesFiltroComponent } from './components/sedes/sedes-filtro/sedes-filtro.component';
import { ServiciosFiltroComponent } from './components/servicios/servicios-filtro/servicios-filtro.component';
import { CapacidadFiltroComponent } from './components/capacidad/capacidad-filtro/capacidad-filtro.component';
import { SeguridadFiltroComponent } from './components/seguridad/seguridad-filtro/seguridad-filtro.component';
import { SancionesFiltroComponent } from './components/sanciones/sanciones-filtro/sanciones-filtro.component';
import { PrestadoresDetalleComponent } from './components/prestadores/prestadores-detalle/prestadores-detalle.component';
import { SedesDetalleComponent } from './components/sedes/sedes-detalle/sedes-detalle.component';
import { ServiciosDetalleComponent } from './components/servicios/servicios-detalle/servicios-detalle.component';
import { CapacidadDetalleComponent } from './components/capacidad/capacidad-detalle/capacidad-detalle.component';
import { SeguridadDetalleComponent } from './components/seguridad/seguridad-detalle/seguridad-detalle.component';
import { SancionesDetalleComponent } from './components/sanciones/sanciones-detalle/sanciones-detalle.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NumberDirective } from './services/NumberDirective';
import {MinsaludConsultaUtilService} from './services/minsalud-consulta-util.service';
import { PrestadoresDetalleModalComponent } from './components/prestadores/prestadores-detalle-modal/prestadores-detalle-modal.component';
import { Component } from '@angular/core';
import { SedesDetalleModalComponent } from './components/sedes/sedes-detalle-modal/sedes-detalle-modal.component';
import { ServiciosDetalleModalComponent } from './components/servicios/servicios-detalle-modal/servicios-detalle-modal.component';
import { CapacidadDetalleModalComponent } from './components/capacidad/capacidad-detalle-modal/capacidad-detalle-modal.component';
import { SeguridadDetalleModalComponent } from './components/seguridad/seguridad-detalle-modal/seguridad-detalle-modal.component';
import { SancionesDetalleModalComponent } from './components/sanciones/sanciones-detalle-modal/sanciones-detalle-modal.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { MinsaludModalUtilService } from './services/minsalud-modal-util.service';

const routes: Routes = [
  {
    path: "",
    component: PrestadoresFiltroComponent,
    children: []
  }
];


@NgModule({
  declarations: [GeneralComponent, PrestadoresFiltroComponent, SedesFiltroComponent, ServiciosFiltroComponent, CapacidadFiltroComponent, SeguridadFiltroComponent, SancionesFiltroComponent, PrestadoresDetalleComponent, SedesDetalleComponent, ServiciosDetalleComponent, CapacidadDetalleComponent, SeguridadDetalleComponent, SancionesDetalleComponent, NumberDirective, PrestadoresDetalleModalComponent, SedesDetalleModalComponent, ServiciosDetalleModalComponent, CapacidadDetalleModalComponent, SeguridadDetalleModalComponent, SancionesDetalleModalComponent],
  imports: [
    CommonModule,
    MinsaludConsultaRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  entryComponents: [
    PrestadoresDetalleModalComponent, 
    SedesDetalleModalComponent, 
    ServiciosDetalleModalComponent, 
    CapacidadDetalleModalComponent, 
    SeguridadDetalleModalComponent, 
    SancionesDetalleModalComponent],
  providers: [ 
    MinsaludConsultaUtilService,
    PrestadoresDetalleComponent,
    SedesDetalleComponent,
    ServiciosDetalleComponent,
    CapacidadDetalleComponent,
    SeguridadDetalleComponent,
    SancionesDetalleComponent,
    RecaptchaService,
    MinsaludModalUtilService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MinsaludConsultaModule {

 }
