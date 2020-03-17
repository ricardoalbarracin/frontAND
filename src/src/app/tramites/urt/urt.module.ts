import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { UrtRoutingModule } from './urt-routing.module';
import { PrincipalUrtComponent } from './components/principal-urt/principal-urt.component';
import { UrtComponent } from './components/urt/urt.component';
import { ListaOpcionesComponent } from './components/lista-opciones/lista-opciones.component';
import { PreguntaRadioComponent } from './components/pregunta-radio/pregunta-radio.component';
import { PreguntaAbiertaComponent } from './components/pregunta-abierta/pregunta-abierta.component';
import { PreguntaImagenComponent } from './components/pregunta-imagen/pregunta-imagen.component';
import { RespuestaUrtComponent } from './components/respuesta-urt/respuesta-urt.component';

@NgModule({
  declarations: [PrincipalUrtComponent, UrtComponent, ListaOpcionesComponent,
    PreguntaRadioComponent, PreguntaAbiertaComponent, PreguntaImagenComponent,
  RespuestaUrtComponent],
  imports: [
    CommonModule,
    UrtRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class UrtModule { }