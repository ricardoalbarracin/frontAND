import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CertificadoTradicionLibertadRoutingModule } from './certificado-tradicion-libertad-routing.module';
import { ConsultaIndicePropietariosComponent } from './components/consulta-indice-propietarios/consulta-indice-propietarios.component';
import { ResumenConsultaComponent } from './components/resumen-consulta/resumen-consulta.component';
import { ContainerCertificadoComponent } from './components/container-certificado/container-certificado.component';
import { DatosSolicitanteComponent } from './components/datos-solicitante/datos-solicitante.component';
import { ValidacionCertificadoComponent } from './components/validacion-certificado/validacion-certificado.component';
import { GenerarCertificadoComponent } from './components/generar-certificado/generar-certificado.component';
import { ResumenPagoComponent } from './components/resumen-pago/resumen-pago.component';
import { CertificadoNoPropiedadComponent } from './components/certificado-no-propiedad/certificado-no-propiedad.component';
import { InfoNumeroPinComponent } from './components/info-numero-pin/info-numero-pin.component';
import { InfoMatriculaComponent } from './components/info-matricula/info-matricula.component';
import { PagoPseComponent } from './components/pago-pse/pago-pse.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';

@NgModule({
  declarations: [
    ConsultaIndicePropietariosComponent, 
    ResumenConsultaComponent, 
    ContainerCertificadoComponent, 
    DatosSolicitanteComponent, 
    ValidacionCertificadoComponent, 
    GenerarCertificadoComponent, 
    ResumenPagoComponent, 
    CertificadoNoPropiedadComponent, 
    InfoNumeroPinComponent, 
    InfoMatriculaComponent, 
    PagoPseComponent, 
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    CertificadoTradicionLibertadRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificadoTradicionLibertadModule { }
