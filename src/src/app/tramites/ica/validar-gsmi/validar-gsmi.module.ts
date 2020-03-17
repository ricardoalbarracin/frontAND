import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidarGsmiRoutingModule } from './validar-gsmi-routing.module';
import { ValidarComponent } from './components/validar/validar.component';
import { ObtenerGsmiComponent } from './components/obtener-gsmi/obtener-gsmi.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ValidarGsmiService } from './services/validar-gsmi.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [ValidarComponent, ObtenerGsmiComponent],
  imports: [
    CommonModule,
    ValidarGsmiRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [ValidarGsmiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValidarGsmiModule { }
