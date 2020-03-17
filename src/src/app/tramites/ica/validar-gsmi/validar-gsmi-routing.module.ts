import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarComponent } from './components/validar/validar.component';
import { ObtenerGsmiComponent } from './components/obtener-gsmi/obtener-gsmi.component';

const routes: Routes = [
  {
    path: '',
    component: ValidarComponent,
    children: [
      {
        path: '',
        component: ObtenerGsmiComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidarGsmiRoutingModule { }
