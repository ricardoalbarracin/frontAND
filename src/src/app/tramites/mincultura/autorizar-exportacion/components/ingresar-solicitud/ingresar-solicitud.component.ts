import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { ModalComponent } from '../modal/modal.component';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-ingresar-solicitud',
  templateUrl: './ingresar-solicitud.component.html',
  styleUrls: ['./ingresar-solicitud.component.scss']
})
export class IngresarSolicitudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, public service: AutorizarExportacionUtilService) {
    this.requiereIntermediarioValor='NO';
   }

   registerForm: FormGroup;
   submitted = false;
   requiereIntermediarioValor:any='SI';
   destinoPaisValor:any;
   captchaValido=true;
   data: any = {
     solicitantes: [{text: 'Option 1', value: '1'}, {text: 'Option 2', value: '2'}],
     pais: [{text: 'COLOMBIA', value: '1'}, {text: 'OTRO', value: '2'}],
   };


   ngOnInit() {
        this.requiereIntermediarioValor='NO';

       this.registerForm = this.formBuilder.group({

        tipoSolicitante: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
        numeroDocumento: ['', Validators.required],
        numeroDocumento2: ['', Validators.required],
        nombreRazonSocial: ['', Validators.required],
        paisExpedicion: ['', Validators.required],
        descripcion: ['', Validators.required],
        departamento: ['', Validators.required],
        municipio: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        correo: ['', Validators.required, Validators.email],
        correo2: ['', Validators.required, Validators.email],
        requiereIntermediario: ['', Validators.required],
        intermediarioTipoDocumento: ['', Validators.required],
        intermediarioNumeroDocumento: ['', Validators.required],
        intermediarioNumeroDocumento2: ['', Validators.required],

        intermediarioPais: ['', Validators.required],
        intermediarioDepartamento: ['', Validators.required],
        intermediarioMunicipio: ['', Validators.required],

        ubicacionDepartamento: ['', Validators.required],
        ubicacionMunicipio: ['', Validators.required],
        ubicacionCorreo: ['', Validators.required, Validators.email],
        ubicacionCorreo2: ['', Validators.required, Validators.email],
        destinoPais: ['', Validators.required],
        destinoCiudad: ['', Validators.required],
        destinoDepartamento: ['', Validators.required],
        destinoMunicipio: ['', Validators.required],
        destinoDireccion: ['', Validators.required],
        autoriza: ['', Validators.requiredTrue],

        formControlRecaptcha: ['', Validators.required]

       });
   }

   get f() { return this.registerForm.controls; }

   open(content) {

    this.asignarVariables();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.service.asignarFormularioInvalido(true);
    }

    if (this.submitted && !this.service.formularioInvalido) {
        this.modalService.open(content, { size: "xl", scrollable: true });
    }


  }

  asignarVariables(){
    this.submitted = true;
    this.service.asignarFormularioInvalido(false);
  }

  closeModal() {
    this.service.asignarFormularioInvalido(false);
    this.modalService.dismissAll();
    this.guardar();
  }

  guardar(){
    this.service.asignarPaso(3);
    this.service.asignarpasoIngresar(2);
  }

   onReset() {
       this.submitted = false;
       this.registerForm.reset();
   }

   volver(){
    this.service.asignarPaso(1);
    this.service.asignarpasoIngresar(1);
    this.service.asignarFormularioInvalido(false);
  }

  colombiaSeleccionado(){
    if(this.destinoPaisValor=='COLOMBIA')
      return true;
    else
      return false;
  }

  validarCaptcha(){

    if(this.registerForm.value.formControlRecaptcha!=null){
      this.captchaValido=true;
    }else{
      this.captchaValido=false;
    }  

  }

  agregar(){
  }
  eliminar(){
  }

}
