import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { AdjuntaDocumentoForm} from './adjunta-documento-form';
import { Router} from '@angular/router';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import {Adjuntos} from '../../models/sic-models';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';

@Component({
  selector: 'app-adjunta-documento',
  templateUrl: './adjunta-documento.component.html',
  styleUrls: ['./adjunta-documento.component.scss']
})
export class AdjuntaDocumentoComponent implements OnInit {
  submitted = false;
  isError = true;
  public uploader: FileUploader = new FileUploader({
    disableMultipart: false,
    maxFileSize: 5242880,
    queueLimit : 5
  });


  public  vadjunto: any[] = [];
  adjuntos: Adjuntos[] ;
  observacion: string;
  constructor(private router: Router) { }
  seleccionForm: FormGroup;
  seleccionSolucionForm: AdjuntaDocumentoForm;
  messages: any;
  invalidForm = false;


  ngOnInit() {
    this.seleccionSolucionForm = new AdjuntaDocumentoForm();
    this.messages = {
      warning_solicitud_soportada : jsonStrings.messages.warning_solicitud_soportada
    };
    this.buildForm();
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }
public findInvalidControls() {
    const invalid = [];
    const controls = this.seleccionForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.error(name);
      }
    }
    return invalid;
  }
  setValidator() {
    // tslint:disable-next-line:triple-equals
    if (this.seleccionForm.value.opcion == 'no') {
      this.seleccionForm.get('observacion').setValidators([Validators.required, Validators.minLength(20)]);
    }
    // tslint:disable-next-line:triple-equals
    if (this.seleccionForm.value.opcion == 'si') {
      this.seleccionForm.get('adjuntos').setValidators([Validators.required]);
    }
  }
  get f() { return this.seleccionForm.controls; }
  continuar() {
    this.submitted = true;
    this.isError = false;
    if (this.seleccionForm.invalid) {
      return;
    }
    this.accion_continuar();
  }
  accion_continuar() {
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/enviar_solicitud']);
    } else {
      this.invalidForm = true;
      return;
    }
    this.observacion = this.seleccionForm.value.observacion;
    sessionStorage.setItem('observacion', (this.observacion));
  }
  accion_anterior() {
    this.router.navigate(['/sic/conducta_alerta']);
  }

  public onFileSelected(File): void {
    console.log('Ajout des fichiers dans le tableau');
    for (let cpt = 0; cpt < File.length; cpt++) {
      const currentFile = File[cpt];
      currentFile.numeroAdjunto = cpt;
      let variable: any;
      variable = {};
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);
      reader.onload = (event) => {
        variable.contenidoArchivo_BASE64 = reader.result;
        variable.numeroAdjunto = this.vadjunto.length;
        variable.nombreArchivo = currentFile.name;
        this.vadjunto.push(variable);
        console.log(this.vadjunto);
        sessionStorage.setItem('adjuntos', JSON.stringify(this.vadjunto)); // salida para enviar al servicio
      };
    }
  }
  sessionRemove() {
    sessionStorage.removeItem('adjuntos');
    this.vadjunto = [];
  }
}
