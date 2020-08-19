import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitarPasaporteComponent } from './components/solicitar-pasaporte/solicitar-pasaporte.component';
import { PagarPasaporteComponent } from './components/pagar-pasaporte/pagar-pasaporte.component';
import { ConsultarEstadoComponent } from './components/consultar-estado/consultar-estado.component';
import { ContainerPasaporteComponent } from './components/container-pasaporte/container-pasaporte.component';
import { EstadoSolicitudComponent } from './components/estado-solicitud/estado-solicitud.component';
import { VerSolicitudPasaporteComponent } from './components/ver-solicitud-pasaporte/ver-solicitud-pasaporte.component';
import { ComprobantePagoPseComponent } from './components/comprobante-pago-pse/comprobante-pago-pse.component';
import { PagoOnlineComponent } from './components/pago-online/pago-online.component';
import { IngresarTramiteComponent } from './components/ingresar-tramite/ingresar-tramite.component';

const routes: Routes = [
  {
    path: "",
    component: ContainerPasaporteComponent,
    children: [
      { 
        path: "",
        component: IngresarTramiteComponent        
      },
      { 
        path: "solicitarPasaporte",
        component: SolicitarPasaporteComponent        
      },
      {
        path: "pagarPasaporte/:data",
        component: PagarPasaporteComponent
      },
      {
        path: "consultarEstado",
        component: ConsultarEstadoComponent
      },
      {
        path: "estadoSolicitud/:nombresApellidos/:tipoPasaporte/:tipoDocumento/:solicitud/:numeroDocumento/:oficina/:estadoSolicitud",
        component: EstadoSolicitudComponent
      },     
      {
        path: "verSolicitudPasaporte",
        component: VerSolicitudPasaporteComponent
      },
      {
        path: "comprobantePagoPse/:ticketID",
        component: ComprobantePagoPseComponent
      },
      {
        path: "pagoOnline/:numeroSolicitud/:proceso/:medioPago/:codigoTramite/:entidad",
        component: PagoOnlineComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitarPasaporteRoutingModule { }
