import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-urt',
  templateUrl: './urt.component.html',
  styleUrls: ['./urt.component.scss']
})
export class UrtComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }


}
