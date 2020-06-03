import { Component, OnInit } from '@angular/core';
import jsonApp from '@stringResources/app-strings.json';
import { Title } from '@angular/platform-browser';
import {SicUtilsService} from '../../services/sic-utils.service';

@Component({
  selector: 'app-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss']
})
export class SicComponent implements OnInit {

  constructor(private pageTitle: Title, private sicUtilsService: SicUtilsService) { }

  ngOnInit() {
    this.setPageTitle();
  }
  setPageTitle() {
    const baseTitle = jsonApp['page-title'];
    const tramiteTitle = 'Denuncia o queja';
    this.pageTitle.setTitle(`${baseTitle}-${tramiteTitle}`);
  }

}
