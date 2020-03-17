import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescargarRsppRoutingModule } from './descargar-rspp-routing.module';
import { DescargarComponent } from './components/descargar/descargar.component';
import { ObtenerRsppComponent } from './components/obtener-rspp/obtener-rspp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DescargarRsppService } from './services/descargar-rspp.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [DescargarComponent, ObtenerRsppComponent],
  imports: [
    CommonModule,
    DescargarRsppRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [DescargarRsppService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DescargarRsppModule { }
