import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdjuntaDocumentoForm} from './adjunta-documento-form'
import { Router} from '@angular/router'
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { HttpClient } from '@angular/common/http';
import { throwMatDuplicatedDrawerError } from '@angular/material';

@Component({
  selector: 'app-adjunta-documento',
  templateUrl: './adjunta-documento.component.html',
  styleUrls: ['./adjunta-documento.component.scss']
})
export class AdjuntaDocumentoComponent implements OnInit {

  seleccionForm: FormGroup;
  seleccionSolucionForm : AdjuntaDocumentoForm;
  messages: any;
  buttonDisabled : boolean = true
  invalidForm: boolean;

  constructor(private router:Router, private http: HttpClient) { }

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

  accion_continuar(){
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid()) {
      this.router.navigate(['/sic/enviar_solicitud']);
    }
    else {
      this.invalidForm = true;
      return;
    }     
  }

  accion_anterior(){
    this.router.navigate(['/sic/conducta_alerta']);
  }


  ///////
  
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
   
  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.buttonDisabled = false;
      this.preview();
  }
 
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
   
  onSubmit() {
      const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('url/to/your/api', formData)
        .subscribe(res => {
          console.log(res);
          //this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!!');
        }) 
  }


  ///////


}
