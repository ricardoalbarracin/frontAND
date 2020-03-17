import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpsRoutingModule } from './dps-routing.module';
import { DpsComponent } from './components/dps/dps.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OpcionesDpsComponent } from './components/opciones-dps/opciones-dps.component';
import { VinculacionFormComponent } from './components/vinculacion-form/vinculacion-form.component';
import { VerificarFormComponent } from './components/verificar-form/verificar-form.component';
import { DpsUtilsService } from './services/dps-utils.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [DpsComponent, OpcionesDpsComponent, VinculacionFormComponent, VerificarFormComponent],
  imports: [
    CommonModule,
    DpsRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DpsUtilsService],
})
export class DpsModule { }