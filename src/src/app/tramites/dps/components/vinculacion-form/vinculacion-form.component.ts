import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  jsonStrings  from '@stringResources/tramites/dps-strings.json';
import { VinculacionForm } from './vinculacion-form';
import { Router } from '@angular/router';
import { DpsUtilsService } from '../../services/dps-utils.service';
import { TiposDocumento } from '../../models/tiposDocumento';

@Component({
  selector: 'app-vinculacion-form',
  templateUrl: './vinculacion-form.component.html',
  styleUrls: ['./vinculacion-form.component.scss']
})
export class VinculacionFormComponent implements OnInit {
  public buscarForm: VinculacionForm;
  public form: FormGroup;
  public messages: {};
  public invalidForm: boolean;
  public tiposDocumentos: TiposDocumento [];
  public invalidDocumento: boolean;
  public invalidTipoDocumento: boolean;
  public invalidRecaptcha: boolean;


  constructor(private dpsUtilsService: DpsUtilsService, private router: Router) {
     this.tiposDocumentos  = this.dpsUtilsService.getTiposDocumento();
     this.invalidForm = false;
     this.invalidTipoDocumento = false;
     this.invalidDocumento = false;
     this.invalidRecaptcha = false;
   }

  @Output() mensajeError = new EventEmitter<string>();
  @Output() showSuccess = new EventEmitter<boolean>();

  sendMessage() {
    this.mensajeError.emit('2');
  }

  showMensajeSuccess(activo) {
    this.showSuccess.emit(activo);
  }

  ngOnInit() {
    this.buscarForm = new VinculacionForm();
    this.showMensajeSuccess(false);
    this.form = this.buscarForm.getForm();
    this.messages = {
      searchEmpty : jsonStrings.messages["search-empty"],
    };
  }

  reset() {
    this.invalidForm = false;
    this.mensajeError.emit('0');
    this.showMensajeSuccess(false);
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('steptramites', step);
  }

  changeValue() {
    this.reset();
    this.setStep("2");
  }

  onKeyValidNumber(event) {
    const e = <KeyboardEvent> event;
    let ch = String.fromCharCode(e.keyCode);
    let regEx =  new RegExp('^[0-9]*$'); 
    console.log(e.keyCode);
    if ([46, 8].indexOf(e.keyCode) !== -1 ) {
      return true;
    }

    console.log(ch);
    if(regEx.test(ch))
      return true;
    else
      return false;
  }

  search() {
      this.invalidForm = false;
      this.mensajeError.emit('0');
      this.invalidTipoDocumento = false;
      this.invalidDocumento = !this.form.get('documento').valid;
      this.invalidRecaptcha = !this.form.get('recaptcha').touched;

      if(this.form.value.tipo_documento == "" || this.form.value.tipo_documento == null){
        this.invalidTipoDocumento = true;
      }

      if (!this.buscarForm.isValid()) {
      this.invalidForm = true;
      return;
    }
      this.dpsUtilsService.sendVinculacion(this.form.value).subscribe(
      (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          if(navigator.msSaveBlob){ // For ie and Edge
             console.log("microsoft edge");
             navigator.msSaveBlob(blob, "certificado.pdf");
          } else if (window.navigator && window.navigator.msSaveOrOpenBlob) {
             console.log("microsoft");
              window.navigator.msSaveOrOpenBlob(blob,  "certificado.pdf");
            }
          else {
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl); 
                console.log("otros"); 
          }
          this.showMensajeSuccess(true);
          
          this.setStep("4");
      },
      error => {
         this.sendMessage();
         this.setStep("4");
        
         return;
      },
    );
  }

}
