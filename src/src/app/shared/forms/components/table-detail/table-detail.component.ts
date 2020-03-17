import { Component, OnInit, Input, OnChanges, QueryList, ViewChildren, SimpleChanges } from '@angular/core';
import { TableHeaderModel, TableConfigModel, TableCellModel } from '@shared/forms/models/table.model';
import { SelectListItemModel } from '@shared/forms/models/select-list-item.model';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from '@shared/forms/directives/sortable.directive';
import { TableService } from '@shared/forms/services/table.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
  providers: [TableService]
})
export class TableDetailComponent implements OnInit, OnChanges {

  @Input() hContent: TableHeaderModel[];
  @Input() hConfig?: TableConfigModel[];
  @Input() bContent: TableCellModel[];
  @Input() bConfig?: TableConfigModel[];
  @Input() showDetail: boolean;
  @Input() showTotal: boolean;

  pageList: SelectListItemModel[] = [];
  content: Observable<TableCellModel[]>;
  total: Observable<number>;
  service: TableService;
  selected: number;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(service: TableService) {
    this.total = service.total$;
    this.content = service.countries$;
    this.service = service;
  }

  ngOnInit() {
    this.setPageList();
    this.service.setCountries(this.bContent);
    this.service.pageSize = 5;
    this.selected = 5;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bContent.previousValue != changes.bContent.currentValue){
      this.service.setCountries(changes.bContent.currentValue);
    }
  }

  getPageSize(event) {
    this.service.pageSize = event;
  }

  private setPageList() {
    this.pageList.push({text: '2 REGISTROS', value: 2});
    this.pageList.push({text: '5 REGISTROS', value: 5});
    this.pageList.push({text: '10 REGISTROS', value: 10});
    this.pageList.push({text: '15 REGISTROS', value: 15});
    this.pageList.push({text: '20 REGISTROS', value: 20});
  }
}
