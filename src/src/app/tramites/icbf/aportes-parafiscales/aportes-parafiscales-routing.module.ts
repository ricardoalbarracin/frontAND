import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AportesParafiscalesComponent } from './components/aportes-parafiscales/aportes-parafiscales.component';
import { LoginIcbfComponent } from './components/login-icbf/login-icbf.component';
import { RegistroIcbfComponent } from './components/registro-icbf/registro-icbf.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GenerarCertificadoComponent } from './components/generar-certificado/generar-certificado.component';

const routes: Routes = [
  {
    path: '',
    component: AportesParafiscalesComponent,
    children: [
      {
        path: '',
        component: LoginIcbfComponent
      },
      {
        path: 'registro',
        component: RegistroIcbfComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'generar-certificado',
        component: GenerarCertificadoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AportesParafiscalesRoutingModule { }
