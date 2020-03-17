import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { EmbebidosComponent } from './components/embebidos/embebidos.component';

const routes: Routes = [
  {
    path: "",
    component: GeneralComponent,
    children: [
      {
        path: "embebido",
        component: EmbebidosComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FichaTramiteRoutingModule { }
