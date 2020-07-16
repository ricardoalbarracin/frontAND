import { Component, OnInit, ElementRef, ViewChild,EventEmitter,Output } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseFileModel } from '../models/responseFileModel';


@Component({
  selector: 'app-subirarchivo',
  templateUrl: './subirarchivo.component.html',
  styleUrls: ['./subirarchivo.component.scss']
})
export class SubirarchivoComponent implements OnInit {
  @Output() uploaded = new EventEmitter<ResponseFileModel>();
  @Output() canceled = new EventEmitter();

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  file;
  responseFileModel: ResponseFileModel;
  constructor() { }

  ngOnInit() {
  }
  public upload(formData: any) {
    debugger
  }

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.readFile(file.data);
    
  }

  // Para archivos multiples
  private uploadFiles() {
    this.file.inProgress=true;
    this.fileUpload.nativeElement.value = '';
    this.uploadFile(this.file);
  }
  readFile(file) {

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      console.log(file);
      debugger
      const responceFile: ResponseFileModel = {
        FileName: file.name,
        Type: file.type,
        FileContent:(<FileReader>event.target).result.toString()
      };
      this.responseFileModel =responceFile;
    });
  
    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        this.file.progress= Math.round(percent);
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  }

  cancelar() {
    this.canceled.emit();     
  }

  cargar() {
    if(this.responseFileModel != null)
      this.uploaded.emit(this.responseFileModel);
  }

  
  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        debugger
        this.file = { data: file, inProgress: false, progress: 0 };
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
}
