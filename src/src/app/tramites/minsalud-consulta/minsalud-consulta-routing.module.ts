import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { PrestadoresFiltroComponent } from './components/prestadores/prestadores-filtro/prestadores-filtro.component';
import { SedesFiltroComponent } from './components/sedes/sedes-filtro/sedes-filtro.component';
import { ServiciosFiltroComponent } from './components/servicios/servicios-filtro/servicios-filtro.component';
import { CapacidadFiltroComponent } from './components/capacidad/capacidad-filtro/capacidad-filtro.component';
import { SeguridadFiltroComponent } from './components/seguridad/seguridad-filtro/seguridad-filtro.component';
import { SancionesFiltroComponent } from './components/sanciones/sanciones-filtro/sanciones-filtro.component';

const routes: Routes = [
  {
    path: "",
    component: PrestadoresFiltroComponent,
    children: []
  },
  {
    path: "Prestadores",
    component: PrestadoresFiltroComponent,
    children: []
  },
  {
    path: 'Sedes',
    component: SedesFiltroComponent
  },
  {
    path: 'Servicios',
    component: ServiciosFiltroComponent
  },
  {
    path: 'Capacidad',
    component: CapacidadFiltroComponent
  },
  {
    path: 'Medidas',
    component: SeguridadFiltroComponent
  },
  {
    path: 'Sanciones',
    component: SancionesFiltroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinsaludConsultaRoutingModule { }
