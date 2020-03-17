import { Component, OnInit } from '@angular/core';
import jsonApp from '@stringResources/app-strings.json';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-antecedentes-fiscales',
  templateUrl: './antecedentes-fiscales.component.html',
  styleUrls: ['./antecedentes-fiscales.component.scss']
})
export class AntecedentesFiscalesComponent implements OnInit {

  constructor(private pageTitle: Title) { }

  ngOnInit() {
    this.setPageTitle()
  }

  setPageTitle() {
    const baseTitle = jsonApp["page-title"];
    const tramiteTitle = jsonApp.tramites.contraloria["antecedentes-fiscales"].title;
    this.pageTitle.setTitle(`${baseTitle}-${tramiteTitle}`);
  }
 
}
