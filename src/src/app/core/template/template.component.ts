import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal, private titleService: Title) { }

  ngOnInit() {
    this.setDefaultTitle();
    
    // Subscribe un evento genérico para cerrar los modales al cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // close all open modals
        this.modalService.dismissAll();
        window.scrollTo(0, 0);
      }
    });
  }

  setDefaultTitle() {
    this.titleService.setTitle("Trámites y servicios");
  }

}
