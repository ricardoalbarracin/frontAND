import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  scrollControInvalido(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  estadoTramite(paso: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', paso);
  }

}
