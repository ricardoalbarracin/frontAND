import { Component, OnInit, Input } from '@angular/core';
import jsonStrings from '@stringResources/app-strings.json';
import { TramiteDetail } from '../../models/tramiteDetail.js';
import { TramiteModel } from '@shared/tramite-detail/models/tramiteModel.js';
import { TramiteNoSuitModel } from '@shared/tramite-detail/models/tramiteNoSuitModel.js';
import { TramiteDetailService } from '@shared/tramite-detail/services/tramite-detail.service.js';

@Component({
  selector: 'app-tramite-detail',
  templateUrl: './tramite-detail.component.html',
  styleUrls: ['./tramite-detail.component.scss']
})
export class TramiteDetailComponent implements OnInit {

  @Input() name: string;

  @Input() owner: string;

  @Input() id: string;

  tramiteDetail: TramiteDetail;
  tramiteModel: TramiteModel;
  tramiteNoSuitModel: TramiteNoSuitModel;

  constructor(private tramiteDetailService: TramiteDetailService) { }

  ngOnInit() {
    if (jsonStrings != undefined && this.owner != undefined && this.name != undefined) {
      this.tramiteDetail = {
        title: jsonStrings.tramites[this.owner][this.name].title,
        detail: jsonStrings.tramites[this.owner][this.name].detail,
        owner: jsonStrings.tramites[this.owner].name
      };
    }
    if (this.id) {
      if (this.id.substr(0, 1) == 'S') {
        this.tramiteDetailService.getNotSuiteTramiteById(this.id)
          .subscribe(
            (data) => {
              if (data['StatusCode'] != 604){
                this.tramiteNoSuitModel = data;
                this.tramiteDetail = {
                  title: this.tramiteNoSuitModel.Nombre,
                  detail: this.tramiteNoSuitModel.Descripcion,
                  owner: this.tramiteNoSuitModel.NombreEntidad
                };
              }
            },
            (error) => {
              this.tramiteDetail = {
                title: jsonStrings.tramites[this.owner][this.name].title,
                detail: jsonStrings.tramites[this.owner][this.name].detail,
                owner: jsonStrings.tramites[this.owner].name
              };
            }
          );
      } else {
        this.tramiteDetailService.getInfoBasicaEspecificaById(this.id)
          .subscribe(
            (data) => {
              this.tramiteModel = data;
              this.tramiteDetail = {
                title: this.tramiteModel.NombreEstandarizado,
                detail: this.tramiteModel.Proposito,
                owner: this.tramiteModel.Entidad
              };
            },
            (error) => {
              this.tramiteDetail = {
                title: jsonStrings.tramites[this.owner][this.name].title,
                detail: jsonStrings.tramites[this.owner][this.name].detail,
                owner: jsonStrings.tramites[this.owner].name
              };
            }
          );
      }
    }
  }
}
