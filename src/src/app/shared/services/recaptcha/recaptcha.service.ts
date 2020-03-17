import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '@shared/models/responseModel';

export class RecaptchaService {

  private url: string = "Recaptcha/validarRecaptcha";

  constructor(private http: HttpClient) { }

  validateServerKey(key: string) {
    return this.http.post<ResponseModel>(this.url, { "key": key }, {
      headers: new HttpHeaders().append("Content-Type", "application/json").append("angular-show-loading", "true")
    });
  }
}
