import { IngresarTramiteComponent } from './components/ingresar-tramite/ingresar-tramite.component';
import { AutorizarExportacionComponent } from './components/autorizar-exportacion/autorizar-exportacion.component';
import { ConsultarSolicitudComponent } from './components/consultar-solicitud/consultar-solicitud.component';
// import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { IngresarSolicitudComponent } from './components/ingresar-solicitud/ingresar-solicitud.component';
import { IngresarObrasComponent } from './components/ingresar-obras/ingresar-obras.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: '',
        component: GeneralComponent,
      },
      {
        path: 'inicio',
        component: AutorizarExportacionComponent,
      },
      /*  {
         path: 'iniciar-sesion',
         component: IniciarSesionComponent,
       }, */
      {
        path: 'ingresar-solicitud',
        component: IngresarSolicitudComponent,
      },
      {
        path: 'ingresar-obras',
        component: IngresarObrasComponent,
      },
      {
        path: 'ingresar-tramite',
        component: IngresarTramiteComponent,
      },
      {
        path: 'consultar-solicitud',
        component: ConsultarSolicitudComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizarExportacionRoutingModule { }
