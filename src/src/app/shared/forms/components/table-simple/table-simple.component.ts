import { Component, OnInit, Input } from '@angular/core';
import { TableHeaderModel, TableConfigModel, TableCellModel } from '@shared/forms/models/table.model';

@Component({
  selector: 'app-table-simple',
  templateUrl: './table-simple.component.html',
  styleUrls: ['./table-simple.component.scss']
})
export class TableSimpleComponent implements OnInit {
 

  @Input() hContent: TableHeaderModel[];
  @Input() hConfig?: TableConfigModel[];
  @Input() bContent: TableCellModel[];
  @Input() bConfig?: TableConfigModel[];

  ngOnInit(): void {}

}
