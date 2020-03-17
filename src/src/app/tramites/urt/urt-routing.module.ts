import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrtComponent } from './components/urt/urt.component';
import { PrincipalUrtComponent } from './components/principal-urt/principal-urt.component';

const routes: Routes = [
  {
    path: "",
    component: UrtComponent,
    children: [{ 
      path: "",
      component: PrincipalUrtComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UrtRoutingModule { }
