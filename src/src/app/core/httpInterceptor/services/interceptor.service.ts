import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from '@shared/loading/services/loading.service';
import { finalize, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const envUrl = environment.serverUrl;
    //formatea la petición modificando los parametros de la URL de acuerdo al entorno en el que se despliega
    const httpRequest = req.clone({
      url: envUrl + req.url     
    });

    //Verifica la cabecera del mensaje para cargar el loading de la página
    if(httpRequest.headers.has("angular-show-loading")){
      if (httpRequest.headers.get("angular-show-loading") == "true"){
        setTimeout(() => {   
          this.loadingService.startLoading();
        });
      }      
    }

    return next.handle(httpRequest)
      .pipe(
        delay(1000),
        finalize(() => {
          //Verifica la cabecera del mensaje para cargar el loading de la página
          if(httpRequest.headers.has("angular-show-loading")){
            if (httpRequest.headers.get("angular-show-loading") == "true" && httpRequest.headers.get("angular-show-loading") == "true"){
              setTimeout(() => {
                this.loadingService.stopLoading();  
              });              
            }      
          }
      })
    );
  }
}
