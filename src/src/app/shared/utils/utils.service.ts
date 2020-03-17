import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  public wordLimit(value: string, limit: number = 3) {
    const splitValue = value.split(' ');
    if(splitValue.length > 0) {
      const endString = splitValue.length > limit ? '...' : '';
      return splitValue.splice(0, limit).join(' ') + endString;
    } else {
      return value;
    }
  }
}
