import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ConsultaATCForm } from './consulta-atc-form';
import { InvimaUtilsService} from '../../services/invima-utils.service'
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DropdownlistComponent } from '../../../../../shared/forms/components/dropdownlist/dropdownlist.component';
import { stringify } from 'querystring';

@Component({
  selector: 'app-consulta-atc',
  templateUrl: './consulta-atc.component.html',
  styleUrls: ['./consulta-atc.component.scss']
})
export class ConsultaAtcComponent implements OnInit {
  ConsultaATCForm: ConsultaATCForm;
  consultaForm: FormGroup;
  invalidForm = false;
  @ViewChild('subGrupoQuimico', {static:true}) subGrupoQuimico: DropdownlistComponent;
  @ViewChild('sistemaOrganico', {static:true}) sistemaOrganico: DropdownlistComponent;
  @ViewChild('grupoFarmacologico', {static:true}) grupoFarmacologico: DropdownlistComponent;
  @ViewChild('categoriaSustancia', {static:true}) categoriaSustancia: DropdownlistComponent;
  @ViewChild('subGrupoFarmacologico', {static:true}) subGrupoFarmacologico: DropdownlistComponent;

  public listaSistemaOrganico : any = [];
  public listaGrupoFarmacologico: any = [];
  public listaSubGrupoFarmacologico: any = [];
  public listaSubGrupoQuimico: any = [];
  public listaSustancia: any = [];
  public buttonDisabled: boolean = false;
  public activeConsultaHttp : boolean = true;
  
  @Output() invocador:EventEmitter <null>= new EventEmitter();

  constructor(private invimaUtils:InvimaUtilsService) {

  }

  ngOnInit() {
    if(this.invimaUtils.getFormConsultaAtc){
      this.ConsultaATCForm = this.invimaUtils.getFormConsultaAtc;
      this.buildForm();
    } else {
      this.ConsultaATCForm = new ConsultaATCForm();
      this.buildForm();
      this.buttonDisabled = true;
      this.consultaForm.controls['sustancia'].disable();
      this.getDataForm();
      this.disableLists();
    }
  }

  buildForm() {
    this.consultaForm = this.ConsultaATCForm.getForm();    
  }

  ngAfterViewInit(){
    this.activeConsultaHttp = false;
    if(this.invimaUtils.getListaSistemaOrganicoData && this.invimaUtils.getListaSistemaOrganicoData.length>0){
      this.listaSistemaOrganico = this.invimaUtils.getListaSistemaOrganicoData ;
      try{ this.sistemaOrganico.selectItem(this.consultaForm.value.sistemaOrganico)} catch(e){}
    }
    
    if(this.invimaUtils.getListaGrupoFarmacologicoData && this.invimaUtils.getListaGrupoFarmacologicoData.length >0){
      this.listaGrupoFarmacologico = this.invimaUtils.getListaGrupoFarmacologicoData ;
      try{ this.grupoFarmacologico.selectItem(this.consultaForm.value.grupoFarmacologico)} catch(e){}
    }
   
    if(this.invimaUtils.getListaSubGrupoFarmacologicoData  && this.invimaUtils.getListaSubGrupoFarmacologicoData.length> 0){
      this.listaSubGrupoFarmacologico = this.invimaUtils.getListaSubGrupoFarmacologicoData ;
      try{ this.subGrupoFarmacologico.selectItem(this.consultaForm.value.subGrupoFarmacologico)} catch(e){}
    }

    if(this.invimaUtils.getListaSubGrupoQuimicoData && this.invimaUtils.getListaSubGrupoQuimicoData.length>0){
      this.listaSubGrupoQuimico = this.invimaUtils.getListaSubGrupoQuimicoData ;
      try{ this.subGrupoQuimico.selectItem(this.consultaForm.value.subGrupoQuimico)} catch(e){}
    }
    
    if(this.invimaUtils.getListaSustanciaData && this.invimaUtils.getListaSustanciaData.length>0){
      this.listaSustancia = this.invimaUtils.getListaSustanciaData ;
      try{ this.categoriaSustancia.selectItem(this.consultaForm.value.categoriaSustancia)} catch(e){}
    }

    this.consultaForm.get('descripcion').setValue(this.invimaUtils.getDescripcionAtcData);

    setTimeout(()=> { this.activeConsultaHttp = true; }, 400);
  }

  buscar(){
    this.invimaUtils.setFormConsultaAtc = this.ConsultaATCForm ;
    this.invalidForm = false;
    if (this.ConsultaATCForm.isValid()){
      this.invimaUtils.setDescripcionAtcData = this.consultaForm.value.descripcion;
      this.invimaUtils.setListaSistemaOrganicoData = this.listaSistemaOrganico;
      this.invimaUtils.setListaGrupoFarmacologicoData = this.listaGrupoFarmacologico;
      this.invimaUtils.setListaSubGrupoFarmacologicoData = this.listaSubGrupoFarmacologico;
      this.invimaUtils.setListaSubGrupoQuimicoData = this.listaSubGrupoQuimico;
      this.invimaUtils.setListaSustanciaData = this.listaSustancia;

      this.invimaUtils.setTipoConsulta = 2;
      this.invimaUtils.setDetail = true;   
      this.invimaUtils.setatcCode = this.consultaForm.value.categoriaSustancia.value;  
      this.invimaUtils.setError = false;
      this.invocador.emit();
    }
    else{
      //this.invimaUtils.setError = true;
      this.invalidForm = true;
      return;      
    }
  }

  limpiar(){
    this.setStep('2');
    this.invalidForm = false;
    this.invimaUtils.setDetail = false;
    this.invimaUtils.setError = false;
    this.consultaForm.reset();
    this.consultaForm.controls['descripcion'].setValue('sustancia'); 
    this.consultaForm.controls['sustancia'].enable();
    this.buttonDisabled = false;        
    this.invimaUtils.setshowButtonDetail = false;
    const input_error = document.getElementById('sustancia_input');
    input_error.classList.remove('ng-invalid');
    const label_error = document.getElementById('sustancia_label');
    label_error.classList.remove('label-error');
    this.listaSustancia.length = 0;
    this.disableSelects();
  }

  disableLists(){
    this.buttonDisabled = false;
    this.consultaForm.controls['sustancia'].enable();    
    this.disableSelects();
    let controles = ["sistemaOrganico","grupoFarmacologico","subGrupoFarmacologico","subGrupoQuimico","categoriaSustancia","sustancia"];
    this.resetControls(controles);
    this.listaGrupoFarmacologico.length = 0;
    this.listaSubGrupoFarmacologico.length = 0;
    this.listaSubGrupoQuimico.length = 0;
    this.listaSustancia.length = 0;    
  }

  resetControls(controls:string[]){
    this.invalidForm = false;
    for (let control of controls)
      this.consultaForm.controls[control].reset();
  }

  disableSelects(){
    this.invalidForm = false;
    let controles =["sistemaOrganico","subGrupoQuimico","grupoFarmacologico","subGrupoFarmacologico","categoriaSustancia"];
    for (let control of controles)
      this.consultaForm.controls[control].disable();
  }

  enableList(){
    this.buttonDisabled = true;
    this.modifySelect('sistemaOrganico', 'enable');
    this.modifySelect('sustancia', 'disable');
    this.modifySelect('categoriaSustancia', 'disable');
    let controles = ["grupoFarmacologico","subGrupoFarmacologico","subGrupoQuimico","categoriaSustancia","sustancia"];
    this.resetControls(controles);
    this.invalidForm = false;
  }

  enableSustancia(){   
    this.invalidForm = false; 
    if(this.consultaForm.controls['sustancia'].value.length > 0)
    {
      let controles = ["grupoFarmacologico","subGrupoFarmacologico","subGrupoQuimico","categoriaSustancia"];
      this.resetControls(controles);   
      this.modifySelect('categoriaSustancia', 'enable');   
      
      this.getDataSustancias(this.consultaForm.value.sustancia, this.consultaForm.value.descripcion)

    /*
      if (this.consultaForm.value.descripcion == "atc"){
        this.invimaUtils.getListaSustanciaXATC(this.consultaForm.value.sustancia)
        .subscribe((data: any[]) => {
            if (data.length > 0){
              this.listaSustancia = data;
            }
          }, (error) => {
            console.error(error);
            this.listaSustancia.length = 0;
          }
        );
      }
      else if (this.consultaForm.value.descripcion == "sustancia"){
        this.invimaUtils.getListaSustanciaXNombre(this.consultaForm.value.sustancia)
        .subscribe((data: any[]) => {
            if (data.length > 0){
              this.listaSustancia = data;
            }
          }, (error) => {
            console.error(error);
            this.listaSustancia.length = 0;
          }
        );
      } */
    }
  }

  getDataSustancias(value: string, param: string) {
    this.invimaUtils.getListaSustanciasXParam(value,param)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaSustancia = data;
        }
      }, (error) => {
        console.error(error);
        this.listaSustancia.length = 0;
      }
      );
  }

  //action -> enable/disable
  modifySelect(value: string, action: string){
    this.invalidForm = false;
    if (action == "enable"){
      this.consultaForm.controls[value].enable();
    }else {
      this.consultaForm.controls[value].disable();
    }
  }

  enableSelectgrupoFarmacologico(){
    if(!this.activeConsultaHttp){
      return true;
    }

    this.invalidForm = false;
    let controles = ["grupoFarmacologico","subGrupoFarmacologico","subGrupoQuimico","categoriaSustancia"];
    this.resetControls(controles);
    this.modifySelect('grupoFarmacologico', 'enable');
    this.invimaUtils.getListaGrupoFamacologico(this.consultaForm.value.sistemaOrganico.value)
    .subscribe((data: any[]) => {
        if (data.length > 0){
          this.listaGrupoFarmacologico = data;
        }
      }, (error) => {
        console.error(error);
      }
    );
    this.listaSubGrupoFarmacologico.length = 0;
    this.listaSubGrupoQuimico.length = 0;    
    this.listaSustancia.length = 0;

  }

 
  enableSelectsubGrupoFarmacologico(){  
    if(!this.activeConsultaHttp){
      return true;
    } 
    let controles = ["subGrupoFarmacologico","subGrupoQuimico","categoriaSustancia"];
    this.resetControls(controles);   
    this.modifySelect('subGrupoFarmacologico', 'enable');
    this.invimaUtils.getListaSubGrupoFarmacologico(this.consultaForm.value.grupoFarmacologico.value)
    .subscribe((data: any[]) => {
        if (data.length > 0){
          this.listaSubGrupoFarmacologico = data;
        }
      }, (error) => {
        console.error(error);
      }
    );
    this.listaSubGrupoQuimico.length = 0;    
    this.listaSustancia.length = 0; 

  }

  enableSelectsubGrupoQuimico(){
    if(!this.activeConsultaHttp){
      return true;
    }
    let controles = ["subGrupoQuimico","categoriaSustancia"];
    this.resetControls(controles);     
    this.modifySelect('subGrupoQuimico', 'enable');  
    this.invimaUtils.getListaSubGrupoQuimico(this.consultaForm.value.subGrupoFarmacologico.value)
    .subscribe((data: any[]) => {
        if (data.length > 0){
          this.listaSubGrupoQuimico = data;
        }
      }, (error) => {
        console.error(error);
      }
    );
    this.listaSustancia.length = 0; 

  }

  enableSelectcategoriaSustancia(){
    if(!this.activeConsultaHttp){
      return true;
    }
    let controles = ["categoriaSustancia"];
    this.resetControls(controles);
    this.modifySelect('categoriaSustancia', 'enable'); 
    
    this.getDataSustancias("lista_sustancia", this.consultaForm.value.subGrupoQuimico.value)
    // this.invimaUtils.getListaSustancia()
    // .subscribe((data: any[]) => {
    //     if (data.length > 0){
    //       this.listaSustancia = data;
    //     }
    //   }, (error) => {
    //     console.error(error);
    //   }
    // );  
  }

  getDataForm() {
    this.invimaUtils.getListaSistemaOrganico()
    .subscribe((data: any[]) => {
        if (data.length > 0){
          this.listaSistemaOrganico = data;
        }
      }, (error) => {
        console.error(error);
      }
    );
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

}
