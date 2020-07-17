import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { IngresarSolicitudComponent } from './components/ingresar-solicitud/ingresar-solicitud.component';
import { IngresarObrasComponent } from './components/ingresar-obras/ingresar-obras.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
    children: [{
      path: "",
      component: GeneralComponent,
    },{
      path: "ingresar",
      component: IngresarSolicitudComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizarExportacionRoutingModule { }
