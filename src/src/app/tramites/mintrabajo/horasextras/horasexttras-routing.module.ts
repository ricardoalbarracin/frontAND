import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ConsultaComponent } from './consultatramite/components/consulta/consulta.component';
import { SelecciontramiteComponent } from './components/selecciontramite/selecciontramite.component';
import { DescripciontramiteComponent } from './radicartramite/components/descripciontramite/descripciontramite.component';
import { DocumentostramiteComponent } from './radicartramite/components/documentostramite/documentostramite.component';
import { TramiteregistradoComponent } from './radicartramite/components/tramiteregistrado/tramiteregistrado.component';

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
    children: [{
      path: "",
      component: PrincipalComponent
    },{
      path: "consultar",
      component: ConsultaComponent
    },{
      path: "seleccionar",
      component: SelecciontramiteComponent
    },
    {
      path: "descripcion",
      component: DescripciontramiteComponent
    },
    {
      path: "documentos",
      component: DocumentostramiteComponent
    },
    {
      path: "registro",
      component: TramiteregistradoComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HorasExttrasRoutingModule { }
