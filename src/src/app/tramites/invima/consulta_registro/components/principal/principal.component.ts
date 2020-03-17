import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OpcionConsultaForm} from './opcion-consulta-form'
import { InvimaUtilsService} from '../../services/invima-utils.service'
import {ConsultaGeneralComponent} from '../consulta-general/consulta-general.component'
import jsonStrings from '@stringResources/tramites/consulta-registro-sanitario.json';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  consultaForm: FormGroup;
  opcionConsultaFrom : OpcionConsultaForm;
  paramsList: any;
  invalidForm = false;
  messages: any;
  invimaUtils: InvimaUtilsService;
  @ViewChild(ConsultaGeneralComponent,{static:false}) child: ConsultaGeneralComponent;

  constructor(private invimaUtil:InvimaUtilsService, private location: Location) { 
    this.invimaUtils = invimaUtil;
  }

  llamado(){
    this.child.setTableFilterData();
  }

  ngOnInit() {
    if(this.invimaUtils.getFormPrincipal){
      this.opcionConsultaFrom = this.invimaUtils.getFormPrincipal;
    }else {
      this.opcionConsultaFrom = new OpcionConsultaForm();
    }
    this.buildForm();
    this.messages = {
      busquedavacia : jsonStrings.messages.busquedaVacia
    };
  }

  buildForm() {    
    this.consultaForm = this.opcionConsultaFrom.getForm();    
  }

  inactiveDetail(){
    this.invimaUtils.setDetail = false;
    this.invimaUtils.setError = false;
    this.setStep('2');
    this.invimaUtils.setFormPrincipal = this.opcionConsultaFrom ;
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  retornarPagina(){
    this.invimaUtils.setshowButtonDetail = false;
    this.location.back();
  }
}
