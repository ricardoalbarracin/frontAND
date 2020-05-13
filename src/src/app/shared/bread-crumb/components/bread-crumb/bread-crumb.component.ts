import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { filter, partition } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';
import { BreadCrumb } from '../../models/breadcrumb';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent implements OnInit {
  breadCrumb: BreadCrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadCrumb = [];
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        this.breadCrumb = [];
        if (route.root != undefined){
          this.setTreeRoute(route.root);
        }

        this.breadCrumb = [{
          name: "Trámites y servicios",
          url: "/"
        }, ...this.breadCrumb.reverse()];
      });
  }

  private setTreeRoute(parent: ActivatedRoute) {
    if(parent.children != undefined && parent.children.length > 0) {
      if (parent.children[0].snapshot != undefined){
        this.setTreeRoute(parent.children[0]);
      }
    }

    let url = parent.snapshot.url.join('');
    if (parent.snapshot != undefined && url != "" && parent.snapshot.data.title != undefined){
      this.breadCrumb = [ ...this.breadCrumb, {
        name: parent.snapshot.data.title,
        url: url
      }];
    }
    if (parent.snapshot != undefined && url != "" && parent.snapshot.data.title == "" ){
        let idTramite = parent.snapshot.params.id;
        let letra = idTramite.substr(0,1)
        if(letra.toUpperCase() == "T" || letra.toUpperCase() == "S")
        {
          let numeros = idTramite.substr(1,20)
          let regexpNumber = new RegExp('^[0-9]+$');
            if(regexpNumber.test(numeros)){
              this.breadCrumb = [ ...this.breadCrumb, {
                name: idTramite.toUpperCase(),
                url: url
              }];
            }
         }
    }
  }

}