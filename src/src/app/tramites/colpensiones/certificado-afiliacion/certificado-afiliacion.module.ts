import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CertificadoAfiliacionRoutingModule } from './certificado-afiliacion-routing.module';
import { CertificadoAfiliacionComponent } from './components/certificado-afiliacion/certificado-afiliacion.component';
import { DescargarComponent } from './components/descargar/descargar.component';
import { CertificadoAfiliacionUtilsService } from './services/certificado-afiliacion-utils.service';


@NgModule({
  declarations: [CertificadoAfiliacionComponent, DescargarComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    CertificadoAfiliacionRoutingModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [ CertificadoAfiliacionUtilsService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificadoAfiliacionModule { }
