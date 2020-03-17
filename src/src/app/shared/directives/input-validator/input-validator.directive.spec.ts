import { InputValidatorDirective } from './input-validator.directive';
import { ElementRef } from '@angular/core';

describe('InputValidatorDirective', () => {
  let elemRef: ElementRef;
  
  it('should create an instance', () => {
    const directive = new InputValidatorDirective(elemRef);
    expect(directive).toBeTruthy();
  });
});
