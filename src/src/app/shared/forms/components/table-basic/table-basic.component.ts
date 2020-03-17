import { Component, OnInit, Input } from '@angular/core';
import { TableHeaderModel, TableCellModel, TableConfigModel} from '@shared/forms/models/table.model';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {

  @Input() hContent: TableHeaderModel[];
  @Input() bContent: TableCellModel[];
  @Input() bConfig?: TableConfigModel[];

  constructor() { }

  ngOnInit() {
    console.log(this.hContent);
  }
}
