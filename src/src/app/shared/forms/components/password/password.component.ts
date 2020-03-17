import { Component, OnInit, OnChanges, Input, ElementRef, Output, EventEmitter, HostListener, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PasswordComponent),
        multi: true
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor, OnChanges {

  private onChange;
  @Input() isDisabled: boolean;

  ngOnChanges(): void {    
  }

  writeValue(value: any): void {
      this.value = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
  
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  @Input() maxLength?: number;
  @Input() placeholder?: string;
  private wasInside = false;
  public value: string;

  constructor(private eRef: ElementRef) {}

  // Función que escucha evento click sobre el componente
  openPassword() {
    const kb = document.getElementById('keyboard');
    kb.classList.add('show');
    this.wasInside = true;
  }
  // Función que escucha evento click fuera del componente
  @HostListener('document:click')
  clickout() {
    const kb = document.getElementById('keyboard');
    if (!this.wasInside) {
      kb.classList.remove('show');
    }
    this.wasInside = false;
  }
  // Función evento que asigna el número seleccionado al password
  setValue(value) {
    const pass: any  = document.getElementById('passwordValue');
    if (this.maxLength === undefined || pass.value.length < this.maxLength) {
      pass.value += value;
      this.value += value;
    }
    this.wasInside = true;

    this.onChangeValue(pass.value);
  }

  // Función evento que asigna el número seleccionado al password
  onChangeValue(value: any): void {
    this.onChange(value);
    setTimeout(() => {
      const eventClick = new Event('change');
      this.eRef.nativeElement.dispatchEvent(eventClick);
    }, 50);
  }

  // Función que elimina uno a uno los elementos en el password
  eraseValue() {
    const pass: any = document.getElementById('passwordValue');
    if (pass.value.length > 0) {
      pass.value = pass.value.slice(0, pass.value.length - 1);
    }
    this.wasInside = true;
  }
  // Función que habilita la visualización del password
  checkShowPassword() {
    const x: any = document.getElementById('passwordValue');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
