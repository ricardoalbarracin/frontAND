import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecedentesFiscalesRoutingModule } from './antecedentes-fiscales-routing.module';
import { AntecedentesFiscalesComponent } from './components/antecedentes-fiscales/antecedentes-fiscales.component';
import { SharedModule } from '@shared/shared.module';
import { BuscarAntecedentesComponent } from './components/buscar-antecedentes/buscar-antecedentes.component';
import { AntecedentesFiscalesService } from './services/antecedentes-fiscales.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';


@NgModule({
  declarations: [AntecedentesFiscalesComponent, BuscarAntecedentesComponent],
  imports: [
    CommonModule,
    AntecedentesFiscalesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AntecedentesFiscalesService,
    RecaptchaService
  ]
})
export class AntecedentesFiscalesModule { }
 