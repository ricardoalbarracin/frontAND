import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenciaConduccionRoutingModule } from './licencia-conduccion-routing.module';
import { LicenciaConduccionComponent } from './components/licencia-conduccion/licencia-conduccion.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolicitarCertificadoComponent } from './components/solicitar-certificado/solicitar-certificado.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { LicenciaConduccionService } from './services/licencia-conduccion.service';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { ApostillaComponent } from './components/apostilla/apostilla.component';

@NgModule({
  declarations: [LicenciaConduccionComponent, SolicitarCertificadoComponent, ApostillaComponent],
  imports: [
    CommonModule,
    LicenciaConduccionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [ LicenciaConduccionService, RecaptchaService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicenciaConduccionModule { }
