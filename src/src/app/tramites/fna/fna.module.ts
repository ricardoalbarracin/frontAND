import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FnaRoutingModule } from './fna-routing.module';
import { ReciboPagoCreditoComponent } from './components/recibo-pago-credito/recibo-pago-credito.component';
import { LoginFnaComponent } from './components/login-fna/login-fna.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ConsultaDescargaReciboComponent } from './components/consulta-descarga-recibo/consulta-descarga-recibo.component';


@NgModule({
  declarations: [ReciboPagoCreditoComponent, LoginFnaComponent, ConsultaDescargaReciboComponent],
  imports: [    
    FnaRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FnaModule { }
