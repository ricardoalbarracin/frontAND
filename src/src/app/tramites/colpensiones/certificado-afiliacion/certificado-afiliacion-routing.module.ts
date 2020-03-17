import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadoAfiliacionComponent } from './components/certificado-afiliacion/certificado-afiliacion.component';
import { DescargarComponent } from './components/descargar/descargar.component';


const routes: Routes = [
  {
    path: '',
    component: CertificadoAfiliacionComponent,
    children: [
      {
        path: '',
        component: DescargarComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificadoAfiliacionRoutingModule { }
