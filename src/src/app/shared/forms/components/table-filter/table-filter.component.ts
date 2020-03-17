import { Component, OnInit, Input, OnChanges, QueryList, ViewChildren } from '@angular/core';
import { TableHeaderModel, TableConfigModel, TableCellModel, TableFilterModel, PagerConfigModel } from '@shared/forms/models/table.model';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from '@shared/forms/directives/sortable.directive';
import { TableService } from '@shared/forms/services/table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeComponent } from '../date-range/date-range.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  providers: [TableService]
})
export class TableFilterComponent implements OnInit {
  @Input() hContent: TableHeaderModel[];
  @Input() hConfig?: TableConfigModel[];
  @Input() bContent: any[];
  @Input() bConfig?: TableConfigModel[];
  @Input() fConfig?: TableFilterModel[];
  @Input() pConfig?: PagerConfigModel;

  pageList: SelectListItemModel[] = [];
  content: Observable<TableCellModel[]>;
  total: Observable<number>;
  service: TableService;
  modalService: NgbModal;
  selected: number;

  filtersName = [];
  filters = [];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  constructor(modalService: NgbModal, service: TableService) {
    this.total = service.total$;
    this.content = service.countries$;
    this.service = service;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.service.setCountries(this.bContent, this.bConfig, this.hContent.length);
    this.service.pageSize = 6;
    this.setFilters();
    if (this.pConfig !== undefined && this.pConfig != null) {
      this.service.pageSize = this.pConfig.PageSize > 0 ? this.pConfig.PageSize : 6;
    }
  }

  setFilters() {
    const headerNames = this.hContent.map(p => p.columnName);
    if (this.fConfig !== undefined) {
      for (const header of headerNames) {
        // Obtiene el obj header de los filtros con ese name
        const filtersHeader = this.fConfig.find(p => p.columnName === header);

        // Obtiene el index en el header
        const indexHeader = this.hContent.findIndex(p => p.columnName === header);

        // Agrega el name a la posición del header que tiene filtro
        const filterName = filtersHeader !== undefined ? header : '';
        this.filtersName.push(filterName);

        // Opciones del filtro
        let filterContent = [];
        if (filtersHeader !== undefined) {

          // Type: Order
          if (filtersHeader.type === 'order') {
            filterContent = [
              {text: 'Ordenar A - Z ', order: 'desc', type: filtersHeader.type, columnName: header},
              {text: 'Ordenar Z - A ', order: 'asc', type: filtersHeader.type, columnName: header}
            ];
          }

           // Type: Filter Content
          if (filtersHeader.type === 'filter-content') {
            const contentColumn = this.bContent.map(t => t[indexHeader].content).filter((v, i, a) => a.indexOf(v) === i);
            for (const option of contentColumn) {
              filterContent.push({text: option, type: filtersHeader.type, index: indexHeader});
            }
            filterContent.push({text: 'Todo', type: 'filter-content'});
          }

          // Type: Date
          if (filtersHeader.type === 'date') {
            filterContent = [
              {text: 'Más reciente', type: 'date-order', order: 'desc', columnName: header},
              {text: 'Más antiguo', type: 'date-order', order: 'asc', columnName: header},
              {text: 'Rango de tiempo', type: 'date-filter', columnName: header},
              {text: 'Todo', type: 'filter-content'}
            ];
          }

          filtersHeader.content = filterContent;
          this.filters.push(filtersHeader);
        } else {
          this.filters.push( {content: []} );
        }
      }
    }
  }

  setEventOrder(item) {
    this.service.sortContent(item.columnName, item.order);
  }
  setEventFilter(item) {
    this.service.filterContent(item.text, item.index);
  }
  setEventOrderDate(item) {
    this.service.sortContent(item.columnName, item.order);
  }

  setEvent(item) {
    switch (item.type) {
      case 'order':
        this.setEventOrder(item);
        break;
      case 'filter-content':
        this.setEventFilter(item);
        break;
      case 'date-order':
        this.setEventOrderDate(item);
        break;
      case 'date-filter':
        this.selectDateRange(item);
        break;
      default:
        break;
    }
  }

  selectDateRange(item) {
    const modal = this.modalService.open(DateRangeComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modal.componentInstance.selectEvent.subscribe((dataRange) => {
      const configDataRange = {
        isRange: true,
        from: new Date(dataRange.from.year, dataRange.from.month - 1, dataRange.from.day),
        to: new Date(dataRange.to.year, dataRange.to.month - 1, dataRange.to.day)
      };
      this.service.filterRange(configDataRange, item.columnName, 'desc');
    });
  }
}
