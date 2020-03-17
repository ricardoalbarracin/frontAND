import { Component, OnInit } from '@angular/core';
import { InvimaUtilsService} from '../../services/invima-utils.service'
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import jsonApp from '@stringResources/app-strings.json';

@Component({
  selector: 'app-invima',
  templateUrl: './invima.component.html',
  styleUrls: ['./invima.component.scss']
})
export class InvimaComponent implements OnInit {

  constructor(private invimaUtils:InvimaUtilsService,private location: Location, private pageTitle: Title) { }

  ngOnInit() { 
    this.setPageTitle();
  }

  setPageTitle() {
    const baseTitle = jsonApp["page-title"];
    const tramiteTitle = jsonApp.tramites.invima["consulta-registro-sanitario"].title;
    this.pageTitle.setTitle(`${baseTitle}-${tramiteTitle}`);
  }

  retornarPagina(){
    this.invimaUtils.setshowButtonDetail = false;
    this.location.back();
  }
}
