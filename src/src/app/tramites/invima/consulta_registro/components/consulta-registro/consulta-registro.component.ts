import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsultaRegistroForm } from './consulta-registro-form';
import { InvimaUtilsService} from '../../services/invima-utils.service'
import { SelectListItemModel } from '../../../../../shared/forms/models/select-list-item.model';
import { DropdownlistComponent } from '../../../../../shared/forms/components/dropdownlist/dropdownlist.component';

@Component({
  selector: 'app-consulta-registro',
  templateUrl: './consulta-registro.component.html',
  styleUrls: ['./consulta-registro.component.scss']
})
export class ConsultaRegistroComponent implements OnInit {
  ConsultaRegistroForm: ConsultaRegistroForm;
  registroForm: FormGroup;
  invalidForm = false;
  @ViewChild('listaGrupo', {static:true}) listaGrupo: DropdownlistComponent;
  mostrarDetalle = false;
  invalidGrupoProducto = false;
  listaConsultaRegistroGrupo: any;
  @Output() invocador:EventEmitter <null>= new EventEmitter();

  constructor(private invimaUtils:InvimaUtilsService) { 
    if(this.invimaUtils.getFormRegistro){
      this.ConsultaRegistroForm = this.invimaUtils.getFormRegistro;
    } else {
      this.ConsultaRegistroForm = new ConsultaRegistroForm();
    }
    this.buildForm();
    this.getDataForm();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    if(this.invimaUtils.getFormRegistro ) {
      this.listaConsultaRegistroGrupo = this.invimaUtils.getListaConsultaRegistroGrupoData;
      this.listaGrupo.selectItem(this.registroForm.value.grupoProducto);
    }
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  get detalle() { return this.mostrarDetalle; }

  buildForm() {
    this.registroForm = this.ConsultaRegistroForm.getForm();
  }

  buscar() {
    this.invalidGrupoProducto = !this.registroForm.get('grupoProducto').valid;
    if (this.ConsultaRegistroForm.isValid()){
      this.invimaUtils.setFormRegistro = this.ConsultaRegistroForm ;
      this.invimaUtils.setListaConsultaRegistroGrupoData = this.listaConsultaRegistroGrupo;
      this.invimaUtils.setTipoConsulta = 1;
      this.invimaUtils.setDetail = true;   
      this.invimaUtils.setError =false; 
      let tipoConsultaRegistro = 1;
      switch (this.registroForm.value.criterio) {
        case 'expediente':
          tipoConsultaRegistro = 1;
          break;

          case 'producto':
          tipoConsultaRegistro = 2;
          break;
  
          case 'registro':
          tipoConsultaRegistro = 3;
          break;
  
          case 'principio':
          tipoConsultaRegistro = 4;
          break;
      }
      this.invimaUtils.setTipoConsultaRegistro = tipoConsultaRegistro;
      this.invimaUtils.setGroupConsultaRegistro = this.registroForm.value.grupoProducto.value;
      this.invimaUtils.setValueConsultaRegistro = this.registroForm.value.criterioBusqueda;
      this.invocador.emit();
      this.setStep('2');

    }
    else{
      //this.invimaUtils.setError = true;
      this.invalidForm = true;
      return;
    }
  }

  changeCriteriodeBusqueda(event){
    this.registroForm.get('grupoProducto').reset();
    this.registroForm.get('recaptcha').reset();
    this.registroForm.get('criterioBusqueda').reset();
    this.invimaUtils.setDetail = false;
    this.invimaUtils.setshowButtonDetail = false;
    this.invimaUtils.setError = false;
    this.setStep('2');
  }

  limpiar(){
    this.invalidGrupoProducto = false;
    this.invimaUtils.setDetail = false;
    this.invimaUtils.setshowButtonDetail = false;
    this.invimaUtils.setError = false;
    this.registroForm.reset();
    this.setStep('2');
    this.registroForm.controls['criterio'].setValue('producto'); 
    const input_error = document.getElementById('criterio_input');
    input_error.classList.remove('ng-invalid');
    this.invalidForm = false;
  }

  getDataForm() {
    if(!this.invimaUtils.getFormRegistro ) {
      this.invimaUtils.getListaConsultaRegistroGrupo()
      .subscribe((data: any[]) => {
          if (data.length > 0){
            this.listaConsultaRegistroGrupo = data;
          }
        }, (error) => {
          console.error(error);
        }
      );
    }
  }
}
