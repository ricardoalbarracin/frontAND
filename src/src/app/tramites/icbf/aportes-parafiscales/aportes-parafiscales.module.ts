import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AportesParafiscalesRoutingModule } from './aportes-parafiscales-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AportesParafiscalesComponent } from './components/aportes-parafiscales/aportes-parafiscales.component';
import { LoginIcbfComponent } from './components/login-icbf/login-icbf.component';
import { RegistroIcbfComponent } from './components/registro-icbf/registro-icbf.component';
import { ConsultaIcbfComponent } from './components/consulta-icbf/consulta-icbf.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GenerarCertificadoComponent } from './components/generar-certificado/generar-certificado.component';
import { LogoutIcbfComponent } from './components/logout-icbf/logout-icbf.component';
import {AportesParafiscalesUtilsService } from './services/aportes-parafiscales-utils.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { TerminosModalComponent } from './components/terminos-modal/terminos-modal.component';
import { TratamientoDatosModalComponent } from './components/tratamiento-datos-modal/tratamiento-datos-modal.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';


@NgModule({
  declarations: [AportesParafiscalesComponent, LoginIcbfComponent, RegistroIcbfComponent, ConsultaIcbfComponent, ForgotPasswordComponent,
     GenerarCertificadoComponent, LogoutIcbfComponent, TerminosModalComponent, TratamientoDatosModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    AportesParafiscalesRoutingModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [ AportesParafiscalesUtilsService, RecaptchaService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AportesParafiscalesModule { }
