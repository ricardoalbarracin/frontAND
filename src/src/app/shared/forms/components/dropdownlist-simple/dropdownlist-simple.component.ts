import { Component, OnInit, OnChanges, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';

@Component({
  selector: 'app-dropdownlist-simple',
  templateUrl: './dropdownlist-simple.component.html',
  styleUrls: ['./dropdownlist-simple.component.scss']
})
export class DropdownlistSimpleComponent implements OnChanges {

  @Input() items: SelectListItemModel[];
  @Input() onChange?: any;
  @Input() selected?: any;
  @Input() placeholder = 'Seleccionar..';
  @Output() clickEvent: EventEmitter<number> = new EventEmitter();

  public value: string;
  public isDisabled: boolean;

  selectItem(item: SelectListItemModel): void {
    this.value = item.text;
    this.clickEvent.emit(item.value);
    if (this.onChange !== undefined) { this.onChange(item); }
  }
  ngOnChanges(): void {
    if (this.selected !== undefined && this.selected !== null) {
      this.items.forEach(element => {
        if (element.value === this.selected) {
          this.value = element.text;
          this.selectItem(element);
        }
      });
    }
  }
}
