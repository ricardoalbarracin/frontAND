import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CensoIndigenaComponent } from './components/censo-indigena/censo-indigena.component';
import { BuscarCertificadoComponent } from './components/buscar-certificado/buscar-certificado.component';

const routes: Routes = [
  {
    path: '',
    component: CensoIndigenaComponent,
    children: [
      {
        path: '',
        component: BuscarCertificadoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CensoIndigenaRoutingModule { }
