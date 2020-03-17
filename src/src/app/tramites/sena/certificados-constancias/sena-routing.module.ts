import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenaComponent } from './components/sena/sena.component';
import { CertificadoConstanciaComponent } from './components/certificado-constancia/certificado-constancia.component';
import { CertificadoConstanciaListComponent } from './components/certificado-constancia-list/certificado-constancia-list.component';


const routes: Routes = [
  {
    path: '',
    component: SenaComponent,
    children: [
      {
        path: '',
        component: CertificadoConstanciaComponent
      },
      {
        path: 'list',
        component: CertificadoConstanciaListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SenaRoutingModule { }
