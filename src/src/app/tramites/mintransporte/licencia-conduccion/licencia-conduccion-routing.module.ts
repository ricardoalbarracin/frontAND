import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenciaConduccionComponent } from './components/licencia-conduccion/licencia-conduccion.component';
import { SolicitarCertificadoComponent } from './components/solicitar-certificado/solicitar-certificado.component';


const routes: Routes = [
  {
    path: "",
    component: LicenciaConduccionComponent,
    children: [
      {
        path: "",
        component: SolicitarCertificadoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenciaConduccionRoutingModule { }
