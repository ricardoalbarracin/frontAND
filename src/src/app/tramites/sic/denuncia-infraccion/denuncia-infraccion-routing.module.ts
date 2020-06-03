import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SicComponent } from './components/sic/sic.component';
import { SeleccionSolucionComponent} from './components/seleccion-solucion/seleccion-solucion.component';
import { DatosDenuncianteComponent} from './components/datos-denunciante/datos-denunciante.component';
import { DatosDenunciadoComponent} from './components/datos-denunciado/datos-denunciado.component';
import { ConductaAlertaComponent} from './components/conducta-alerta/conducta-alerta.component';
import { AdjuntaDocumentoComponent} from './components/adjunta-documento/adjunta-documento.component';
import { AlerteSicComponent} from './components/alerte-sic/alerte-sic.component';
import { EnviarSolicitudComponent} from './components/enviar-solicitud/enviar-solicitud.component';
import { InicioSesionComponent} from './components/inicio-sesion/inicio-sesion.component';
import { RegistroNuevoUsuarioComponent} from './components/registro-nuevo-usuario/registro-nuevo-usuario.component';
import { DatosPersonaNaturalComponent} from './components/datos-persona-natural/datos-persona-natural.component';
import { UsuarioClaveAccesoComponent} from './components/usuario-clave-acceso/usuario-clave-acceso.component';
import { InicioOpcionSolucionComponent} from './components/inicio-opcion-solucion/inicio-opcion-solucion.component';
import { ConsultaEstadoDenunciaComponent} from './components/consulta-estado-denuncia/consulta-estado-denuncia.component';
import { ReestablecerContrasenaPaso1Component} from './components/reestablecer-contrasena-paso1/reestablecer-contrasena-paso1.component';

const routes: Routes = [
  {
    path: '',
    component: SicComponent,
    children: [{
      path: '',
      component: InicioOpcionSolucionComponent
    },
    {
      path: 'seleccion_solucion',
      component: SeleccionSolucionComponent
    },
    {
      path: 'datos_denunciante',
      component: DatosDenuncianteComponent
    },
    {
      path: 'datos_denuncio',
      component: DatosDenunciadoComponent
    },
    {
      path: 'conducta_alerta',
      component: ConductaAlertaComponent
    },
    {
      path: 'adjunta_documento',
      component: AdjuntaDocumentoComponent
    },
    {
      path: 'enviar_solicitud',
      component: EnviarSolicitudComponent
    },
    {
      path: 'alerta_inicio',
      component: AlerteSicComponent
    },
    {
      path: 'registro_nuevo_usuario',
      component: RegistroNuevoUsuarioComponent
    },
    {
      path: 'datos_persona_natural',
      component: DatosPersonaNaturalComponent
    },
    {
      path: 'usuario_clave_acceso',
      component: UsuarioClaveAccesoComponent
    },
    {
      path: 'reestablecer_contrasena',
      component: ReestablecerContrasenaPaso1Component
    },
    {
      path: 'iniciar_sesion',
      component: InicioSesionComponent
    },
    {
      path: 'consulta_estado_denuncia',
      component: ConsultaEstadoDenunciaComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DenunciaInfraccionRoutingModule { }
