import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CensoIndigenaRoutingModule } from './censo-indigena-routing.module';
import { CensoIndigenaComponent } from './components/censo-indigena/censo-indigena.component';
import { BuscarCertificadoComponent } from './components/buscar-certificado/buscar-certificado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CensoIndigenaService } from './services/censo-indigena.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [CensoIndigenaComponent, BuscarCertificadoComponent],
  imports: [
    CommonModule,
    CensoIndigenaRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [CensoIndigenaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CensoIndigenaModule { }
