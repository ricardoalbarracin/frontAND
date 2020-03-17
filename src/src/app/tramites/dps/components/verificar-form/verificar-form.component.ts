import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  jsonStrings  from '@stringResources/tramites/dps-strings.json';
import { VerificarForm } from './verificar-form';
import { DpsUtilsService } from '../../services/dps-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-form',
  templateUrl: './verificar-form.component.html',
  styleUrls: ['./verificar-form.component.scss']
})
export class VerificarFormComponent implements OnInit {
  public buscarForm: VerificarForm;
  public form: FormGroup;
  public messages: {};
  public invalidForm: boolean;
  public invalidRecaptcha: boolean;

  @Output() mensajeError = new EventEmitter<string>();
  @Output() showSuccess = new EventEmitter<boolean>();

  constructor(private dpsUtilsService: DpsUtilsService, private router: Router) {
    this.invalidRecaptcha = false;
  }

  ngOnInit() {
    this.buscarForm = new VerificarForm();
    this.form = this.buscarForm.getForm();
    this.messages = {
      searchEmpty : jsonStrings.messages["search-empty"],
    };
  }
  

  onKeyValidNumber(event) {
    const e = <KeyboardEvent> event;
    let ch = String.fromCharCode(e.keyCode);
    let regEx =  new RegExp('^[0-9]*$'); 
    console.log(e.keyCode);
    if ([46, 8].indexOf(e.keyCode) !== -1 ) {
      return true;
    }
    console.log(ch)
    if(regEx.test(ch))
      return true;
    else
      return false;
  }

  sendMessage() {
    this.mensajeError.emit('3');
  }

  showMensajeSuccess(activo) {
    this.showSuccess.emit(activo);
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

  changeValue(event) {
    console.log(event);
   /// this.onKeyValidNumber(event);
    this.reset();
    this.setStep("2");
  }

  search() {
    this.invalidForm = false;
    this.invalidRecaptcha = !this.form.get('recaptcha').touched;
    
    this.showMensajeSuccess(false);
    if (!this.buscarForm.isValid()) {
      this.invalidForm = true;
      return;
    }

    this.dpsUtilsService.sendVerificacion(this.form.value).subscribe(
      (response) => {
        this.setStep("4");
        const blob = new Blob([response], { type: 'application/pdf' });
        if(navigator.msSaveBlob){ // For ie and Edge
          console.log("edge"); 
          navigator.msSaveBlob(blob, "certificado.pdf");
         } else if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          console.log("microsoft");
          window.navigator.msSaveOrOpenBlob(blob, "certificado.pdf"); 
          }
          else {
            var objectUrl = URL.createObjectURL(blob);
            window.open(objectUrl);  
            console.log("otros"); 
          }
          this.showMensajeSuccess(true);
      },
      error => {
        this.setStep("4");
        this.sendMessage();
        return;
      },
    );
  }

}
