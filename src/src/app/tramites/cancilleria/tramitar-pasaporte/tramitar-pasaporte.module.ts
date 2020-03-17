import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitarPasaporteRoutingModule } from './tramitar-pasaporte-routing.module';
import { SolicitarPasaporteComponent } from './components/solicitar-pasaporte/solicitar-pasaporte.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { PagarPasaporteComponent } from './components/pagar-pasaporte/pagar-pasaporte.component';
import { ConsultarEstadoComponent } from './components/consultar-estado/consultar-estado.component';
import { ContainerPasaporteComponent } from './components/container-pasaporte/container-pasaporte.component';
import { EstadoSolicitudComponent } from './components/estado-solicitud/estado-solicitud.component';
import { AvisoPrivacidadModalComponent } from './components/aviso-privacidad-modal/aviso-privacidad-modal.component';
import { AyudaPasaporteModalComponent } from './components/ayuda-pasaporte-modal/ayuda-pasaporte-modal.component';
import { VerSolicitudPasaporteComponent } from './components/ver-solicitud-pasaporte/ver-solicitud-pasaporte.component';
import { ComprobantePagoPseComponent } from './components/comprobante-pago-pse/comprobante-pago-pse.component';
import { PagoOnlineComponent } from './components/pago-online/pago-online.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { TramitarPasaporteService } from './services/tramitar-pasaporte.service';

@NgModule({
  declarations: [SolicitarPasaporteComponent, PagarPasaporteComponent, ConsultarEstadoComponent, ContainerPasaporteComponent, EstadoSolicitudComponent, AvisoPrivacidadModalComponent, AyudaPasaporteModalComponent, VerSolicitudPasaporteComponent, ComprobantePagoPseComponent, PagoOnlineComponent],
  imports: [
    CommonModule,
    TramitarPasaporteRoutingModule,
    PdfViewerModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [
    TramitarPasaporteService
  ],
  entryComponents: [
    SolicitarPasaporteComponent,
    AvisoPrivacidadModalComponent,
    AyudaPasaporteModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class TramitarPasaporteModule { }
