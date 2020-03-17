import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvimaRoutingModule } from './invima-routing.module';
import { InvimaComponent } from './consulta_registro/components/invima/invima.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './consulta_registro/components/principal/principal.component';
import { ConsultaRegistroComponent } from './consulta_registro/components/consulta-registro/consulta-registro.component';
import { ConsultaAtcComponent } from './consulta_registro/components/consulta-atc/consulta-atc.component';
import { RouterModule } from '@angular/router';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ConsultaDetalleComponent } from './consulta_registro/components/consulta-detalle/consulta-detalle.component';
import { ConsultaGeneralComponent } from './consulta_registro/components/consulta-general/consulta-general.component';
import { InvimaUtilsService } from './consulta_registro/services/invima-utils.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [InvimaComponent, PrincipalComponent, ConsultaRegistroComponent, ConsultaAtcComponent,  ConsultaDetalleComponent, ConsultaGeneralComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InvimaRoutingModule,
    RouterModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [ InvimaUtilsService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvimaModule { }
