import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DpsComponent } from './components/dps/dps.component';
import { OpcionesDpsComponent } from './components/opciones-dps/opciones-dps.component';
import { DpsUtilsService } from './services/dps-utils.service';

const routes: Routes = [
  {
    path: "",
    component: DpsComponent,
    children: [
      {
        path: "",
        component: OpcionesDpsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class DpsRoutingModule { }
