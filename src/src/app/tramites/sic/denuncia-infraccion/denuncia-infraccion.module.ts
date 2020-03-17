import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SicComponent } from './components/sic/sic.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { SeleccionSolucionComponent } from './components/seleccion-solucion/seleccion-solucion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DenunciaInfraccionRoutingModule } from './denuncia-infraccion-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatosDenunciadoComponent } from './components/datos-denunciado/datos-denunciado.component';
import { DatosDenunciadoPersonaNaturalComponent } from './components/datos-denunciado-persona-natural/datos-denunciado-persona-natural.component';
import { DatosDenunciadoPersonaJuridicaComponent } from './components/datos-denunciado-persona-juridica/datos-denunciado-persona-juridica.component';
import { ConductaAlertaComponent } from './components/conducta-alerta/conducta-alerta.component';
import { AdjuntaDocumentoComponent } from './components/adjunta-documento/adjunta-documento.component';
import { DatosDenuncianteComponent } from './components/datos-denunciante/datos-denunciante.component';
import { DatosDenuncianteApoderadoComponent } from './components/datos-denunciante-apoderado/datos-denunciante-apoderado.component';
import { AlerteSicComponent } from './components/alerte-sic/alerte-sic.component';
import { EnviarSolicitudComponent } from './components/enviar-solicitud/enviar-solicitud.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroNuevoUsuarioComponent } from './components/registro-nuevo-usuario/registro-nuevo-usuario.component';
import { DatosPersonaNaturalComponent } from './components/datos-persona-natural/datos-persona-natural.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { UsuarioClaveAccesoComponent } from './components/usuario-clave-acceso/usuario-clave-acceso.component';
import { ReestablecerContrasenaComponent } from './components/reestablecer-contrasena/reestablecer-contrasena.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioOpcionSolucionComponent } from './components/inicio-opcion-solucion/inicio-opcion-solucion.component';
import { ConsultaEstadoDenunciaComponent } from './components/consulta-estado-denuncia/consulta-estado-denuncia.component';
import { ReestablecerContrasenaPaso1Component } from './components/reestablecer-contrasena-paso1/reestablecer-contrasena-paso1.component';
import { NgbDateCustomParserFormatter, CustomDatepickerI18n } from "./services/date-formater";
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { GrillaConsultaComponent } from './components/grilla-consulta/grilla-consulta.component';


@NgModule({
  declarations: [SicComponent, PrincipalComponent, SeleccionSolucionComponent,  DatosDenunciadoComponent, DatosDenunciadoPersonaNaturalComponent, DatosDenunciadoPersonaJuridicaComponent, ConductaAlertaComponent, AdjuntaDocumentoComponent, DatosDenuncianteComponent, DatosDenuncianteApoderadoComponent, AlerteSicComponent, EnviarSolicitudComponent, InicioSesionComponent, RegistroNuevoUsuarioComponent, DatosPersonaNaturalComponent, UsuarioClaveAccesoComponent, ReestablecerContrasenaComponent, InicioOpcionSolucionComponent, ConsultaEstadoDenunciaComponent, ReestablecerContrasenaPaso1Component, GrillaConsultaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DenunciaInfraccionRoutingModule,
    RouterModule,
    SharedModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    NgbModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DenunciaInfraccionModule { }
