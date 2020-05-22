import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './template/components/header/header.component';
import { MainComponent } from './template/components/main/main.component';
import { FooterComponent } from './template/components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './httpInterceptor/services/interceptor.service';
import { LoadingService } from '@shared/loading/services/loading.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [TemplateComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TemplateComponent
  ],
  providers: [
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
