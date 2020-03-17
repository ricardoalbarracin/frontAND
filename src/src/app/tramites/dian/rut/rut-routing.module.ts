import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutComponent } from './components/rut/rut.component';
import { ObtenerCopiaComponent } from './components/obtener-copia/obtener-copia.component';

const routes: Routes = [
  {
    path: '',
    component: RutComponent,
    children: [
      {
        path: '',
        component: ObtenerCopiaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutRoutingModule { }
