import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ingresar-obras',
  templateUrl: './ingresar-obras.component.html',
  styleUrls: ['./ingresar-obras.component.scss']
})
export class IngresarObrasComponent implements OnInit {

  obras:any=[{consecutivo: 0, titulo:'', anio:0, registro:'' }];
  obraBien:any;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, public service: AutorizarExportacionUtilService) { 
      this.obras= ({consecutivo: 1, titulo: 'Titulo ' + 1, anio: 2019, registro: 'registro ' + 1});

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
        
      grupo: ['', Validators.required],
      subgrupo: ['', Validators.required],
      categoria: ['', Validators.required],
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
      firmado: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      propietarioNombre: ['', Validators.required],
      formControlRecaptcha: ['', Validators.required]
     });
  }

  open(content) {

    this.asignarVariables();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.service.asignarLlega(9);
        this.service.asignarFormularioInvalido(true);
        return;
    }
    this.modalService.open(content, { size: "xl", scrollable: true });
  }


  asignarVariables(){
    this.submitted = true;
    this.service.asignarFormularioInvalido(false);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  guardar(content){
    this.asignarVariablesEnviarMinisterio();
    if(this.service.paso==5){
      this.modalService.open(content, { size: "xl", scrollable: true });
    }

  }

  asignarVariablesEnviarMinisterio(){
    this.service.asignarFormularioInvalido(false);
    if(this.service.paso==3){
      this.service.asignarPaso(4);
      this.service.asignarpasoIngresar(-1);
    }else if(this.service.paso==4){
      this.service.asignarPaso(5);
      this.service.asignarpasoIngresar(-1);
    }else{
      /*PROBAR QUE LLEGA DESDE PRUEBAS UNITARIAS*/
      this.service.asignarPaso(-1);
      //this.modalService.open(content, { size: "xl", scrollable: true });
    }

  }

  cancelar(){
    this.service.asignarPaso(1);
    this.service.asignarpasoIngresar(1);
  }

  get f() { return this.registerForm.controls; }

}
