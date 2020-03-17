import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReciboPagoCreditoComponent } from './components/recibo-pago-credito/recibo-pago-credito.component';
import { LoginFnaComponent } from './components/login-fna/login-fna.component';
import { ConsultaDescargaReciboComponent } from './components/consulta-descarga-recibo/consulta-descarga-recibo.component';


const routes: Routes = [
  {
    path: '',
    component: ReciboPagoCreditoComponent,
    children: [
      {
        path: '',
        component: LoginFnaComponent
      },
      {
        path: 'consulta-recibo',
        component: ConsultaDescargaReciboComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FnaRoutingModule { }
