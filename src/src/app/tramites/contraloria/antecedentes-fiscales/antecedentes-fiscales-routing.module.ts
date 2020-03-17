import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntecedentesFiscalesComponent } from './components/antecedentes-fiscales/antecedentes-fiscales.component';
import { BuscarAntecedentesComponent } from './components/buscar-antecedentes/buscar-antecedentes.component';

const routes: Routes = [
  {
    path: "",
    component: AntecedentesFiscalesComponent,
    children: [
      {
        path: "",
        component: BuscarAntecedentesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntecedentesFiscalesRoutingModule { }
