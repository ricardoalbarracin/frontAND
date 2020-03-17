import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutRoutingModule } from './rut-routing.module';
import { RutComponent } from './components/rut/rut.component';
import { ObtenerCopiaComponent } from './components/obtener-copia/obtener-copia.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RutService } from './services/rut.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [RutComponent, ObtenerCopiaComponent],
  imports: [
    CommonModule,
    RutRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [RutService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RutModule { }
