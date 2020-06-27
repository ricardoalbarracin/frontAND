import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  scrollAlControInvalido(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
