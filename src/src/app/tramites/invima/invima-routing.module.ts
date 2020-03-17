import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvimaComponent } from './consulta_registro/components/invima/invima.component';
import { PrincipalComponent} from './consulta_registro/components/principal/principal.component'
import { ConsultaDetalleComponent} from './consulta_registro/components/consulta-detalle/consulta-detalle.component'

const routes: Routes = [
  {
    path: "",
    component: InvimaComponent,
    children: [{ 
      path: "",
      component: PrincipalComponent        
    },
    {
      path: "detalle",
      component: ConsultaDetalleComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvimaRoutingModule { }
