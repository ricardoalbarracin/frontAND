import {DecimalPipe} from '@angular/common';
import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {TableHeaderModel, TableConfigModel, TableFilterModel } from '@shared/forms/models/table.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [DecimalPipe]
})
export class TablesComponent implements OnInit {
  @Input() tableType: string;
  @Input() hContent: TableHeaderModel[];
  @Input() hConfig?: TableConfigModel[];
  @Input() bContent: TableHeaderModel[];
  @Input() bConfig?: TableConfigModel[];
  @Input() fConfig?: TableFilterModel[];
  @Input() showDetail?: boolean;
  @Input() showTotal?: boolean;
  ngOnInit(): void {}
}
