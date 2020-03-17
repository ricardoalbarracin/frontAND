import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinjusticiaComponent } from './components/minjusticia/minjusticia.component';
import { BuscarAgendaComponent } from './components/buscar-agenda/buscar-agenda.component';
import { RegistroMinjusticiaComponent } from './components/registro-minjusticia/registro-minjusticia.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { VerConsultoriosJuridicosComponent } from './components/ver-consultorios-juridicos/ver-consultorios-juridicos.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { LoginMinjusticiaComponent } from './components/login-minjusticia/login-minjusticia.component';
import { DetalleCitaComponent } from './components/detalle-cita/detalle-cita.component';
import { HistoricoCitasComponent } from './components/historico-citas/historico-citas.component';
import { RestaurarContrasenaComponent } from './components/restaurar-contrasena/restaurar-contrasena.component';


const routes: Routes = [
  {
    path: '',
    component: MinjusticiaComponent,
    children: [
      { 
        path: '',
        component: BuscarAgendaComponent        
      },
      {
        path: 'registro',
        component: RegistroMinjusticiaComponent
      },
      {
        path: 'recuperarContrasena',
        component: RecuperarContrasenaComponent
      },
      {
        path: 'restaurar-contrasena/:username/:token',
        component: RestaurarContrasenaComponent
      },
      {
        path: 'listarConsultorios',
        component: VerConsultoriosJuridicosComponent
      },
      {
        path: 'agendarcita',
        component: AgendarCitaComponent
      },
      {
        path: 'detallecita',
        component: DetalleCitaComponent
      },
      {
        path: 'historico-citas',
        component: HistoricoCitasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultoriosJuridicosRoutingModule { }
