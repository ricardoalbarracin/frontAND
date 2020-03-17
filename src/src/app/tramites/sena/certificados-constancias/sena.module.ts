import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenaRoutingModule } from './sena-routing.module';
import { SenaComponent } from './components/sena/sena.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CertificadoConstanciaComponent } from './components/certificado-constancia/certificado-constancia.component';
import { CertificadoConstanciaListComponent } from './components/certificado-constancia-list/certificado-constancia-list.component';
import {SenaUtilsService } from './services/sena-utils.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [SenaComponent, CertificadoConstanciaComponent, CertificadoConstanciaListComponent],
  imports: [
    CommonModule,
    SenaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  entryComponents: [

  ],
  providers: [ SenaUtilsService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SenaModule { }
