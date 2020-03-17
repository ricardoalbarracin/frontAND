import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescargarComponent } from './components/descargar/descargar.component';
import { ObtenerRsppComponent } from './components/obtener-rspp/obtener-rspp.component';

const routes: Routes = [
  {
    path: '',
    component: DescargarComponent,
    children: [
      {
        path: '',
        component: ObtenerRsppComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescargarRsppRoutingModule { }
