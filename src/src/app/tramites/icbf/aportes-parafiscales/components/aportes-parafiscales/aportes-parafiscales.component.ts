import { Component, OnInit } from '@angular/core';
import jsonApp from '@stringResources/app-strings.json';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aportes-parafiscales',
  templateUrl: './aportes-parafiscales.component.html',
  styleUrls: ['./aportes-parafiscales.component.scss']
})
export class AportesParafiscalesComponent implements OnInit {

  constructor(private pageTitle: Title) { }

  ngOnInit() {
    this.setPageTitle();
  }

  setPageTitle() {
    const baseTitle = jsonApp["page-title"];
    const tramiteTitle = jsonApp.tramites.icbf["aportes-parafiscales"].title;
    this.pageTitle.setTitle(`${baseTitle}-${tramiteTitle}`);
  }

}
