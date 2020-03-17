import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fichaespecifica-header',
  templateUrl: './fichaespecifica-header.component.html',
  styleUrls: ['./fichaespecifica-header.component.scss']
})
export class FichaespecificaHeaderComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
