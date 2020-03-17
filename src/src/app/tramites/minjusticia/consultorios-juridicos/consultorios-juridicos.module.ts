import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultoriosJuridicosRoutingModule } from './consultorios-juridicos-routing.module';
import { MinjusticiaComponent } from './components/minjusticia/minjusticia.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuscarAgendaComponent } from './components/buscar-agenda/buscar-agenda.component';
import { LoginMinjusticiaComponent } from './components/login-minjusticia/login-minjusticia.component';
import { LoginMinjusticiaModalComponent } from './components/login-minjusticia-modal/login-minjusticia-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MinjusticiaUtilsService } from './services/minjusticia-utils.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroMinjusticiaComponent } from './components/registro-minjusticia/registro-minjusticia.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { RegistroMinjusticiaTerminosComponent } from './components/registro-minjusticia-terminos/registro-minjusticia-terminos.component';
import { VerConsultoriosJuridicosComponent } from './components/ver-consultorios-juridicos/ver-consultorios-juridicos.component';
import { VerConsultoriosJuridicosItemComponent } from './components/ver-consultorios-juridicos-item/ver-consultorios-juridicos-item.component';
import { VerConsultoriosJuridicosModalComponent } from './components/ver-consultorios-juridicos-modal/ver-consultorios-juridicos-modal.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { AgendamientoAuthenticationService } from './services/agendamiento-authentication/agendamiento-authentication.service';
import { LogoutMinjusticiaComponent } from './components/logout-minjusticia/logout-minjusticia.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { AgmCoreModule } from '@agm/core';
import { DetalleCitaComponent } from './components/detalle-cita/detalle-cita.component';
import { HistoricoCitasComponent } from './components/historico-citas/historico-citas.component';
import { RestaurarContrasenaComponent } from './components/restaurar-contrasena/restaurar-contrasena.component';


@NgModule({
  declarations: [MinjusticiaComponent, BuscarAgendaComponent, LoginMinjusticiaComponent, LoginMinjusticiaModalComponent, RegistroMinjusticiaComponent, RecuperarContrasenaComponent, RegistroMinjusticiaTerminosComponent, VerConsultoriosJuridicosComponent, VerConsultoriosJuridicosItemComponent, VerConsultoriosJuridicosModalComponent, AgendarCitaComponent, LogoutMinjusticiaComponent, DetalleCitaComponent, HistoricoCitasComponent, RestaurarContrasenaComponent],
  imports: [
    CommonModule,
    ConsultoriosJuridicosRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3Y4YvMly_SpZyKA6QLfcFfqaJKHNP51I'
    })
  ],
  entryComponents: [ 
    LoginMinjusticiaModalComponent,
    RegistroMinjusticiaTerminosComponent,
    VerConsultoriosJuridicosModalComponent
  ],
  providers: [ MinjusticiaUtilsService, AgendamientoAuthenticationService, RecaptchaService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultoriosJuridicosModule { }
