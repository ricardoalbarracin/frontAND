import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Country} from '../../services/country';
import {CountryService} from '../../services/country.service';
import {NgbdSortableHeader, SortEvent} from '../../directives/sortable.directive';

@Component({
  selector: 'app-table-complete',
  templateUrl: './table-complete.component.html',
  styleUrls: ['./table-complete.component.scss']
})
export class TableCompleteComponent {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  pageSize = 1;
  service: CountryService;
  constructor(service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.service = service;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
