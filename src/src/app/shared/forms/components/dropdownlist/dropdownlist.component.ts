import { Component, OnInit, OnChanges, ViewEncapsulation, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {SelectListItemModel} from '../../models/select-list-item.model';
@Component({
  selector: 'app-dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownlistComponent),
        multi: true
    }
  ]
})
export class DropdownlistComponent implements ControlValueAccessor, OnChanges {
  @Input() items: SelectListItemModel[];
  @Input() placeholder = 'Seleccionar..';
  @Input() selected?: any;  
  @Input() isDisabled: boolean;

  public value: string;

  private onChange;

  ngOnChanges() {
    if (this.selected !== undefined && this.selected !== null) {
      if(this.items !== undefined)
        this.items.forEach(element => {
          if (element.value === this.selected) {
            this.selectItem(element);
            this.value = element.text;
          }
        });
    }
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
      this.value = value;
  }
  selectItem(item): void {
    this.value = item.text;
    this.onChange(item);
    setTimeout(() => {
      const eventClick = this.createEvent('change');
      this.elemRef.nativeElement.dispatchEvent(eventClick);
    }, 50);
  }
  createEvent(eventName) {
    let event;
    if (typeof(Event) === 'function') {
        event = new Event(eventName);
    } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    return event;
}

  constructor(private elemRef: ElementRef) {}
}
