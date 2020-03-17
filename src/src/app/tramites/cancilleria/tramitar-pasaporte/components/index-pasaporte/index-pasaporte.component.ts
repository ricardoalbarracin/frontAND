import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-index-pasaporte',
  templateUrl: './index-pasaporte.component.html',
  styleUrls: ['./index-pasaporte.component.scss']
})

export class IndexPasaporteComponent implements OnInit, OnDestroy {

  constructor() {
    const element = document.getElementsByTagName('app-tramite-detail');
    element[0].classList.add('fix-tab');
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    const element = document.getElementsByTagName('app-tramite-detail');
    element[0].classList.remove('fix-tab');
  }
}