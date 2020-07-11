import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { ModalComponent } from '../modal/modal.component';
import { ReturnModelLista} from '../../models/ReturnModelLista';
import {RequestModelCrearSolicitud} from '../../models/requestmodelcrearsolicitud';

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
     TiposDocumento: [],
     departamentos: [],
     minicipiosUbicacion: [],
     municipiosUbicacionIntermediario:[],
     municipiosDestino:[],
     municipiosIntermediario:[],
     paises: [],
     tiposSolicitante: [],
     finesExportacion:[],
     tiposPermanencia:[]
   };


   ngOnInit() {
        this.requiereIntermediarioValor='SI';

        this.obtenerDepartamentos();
        this.obtenerPaises();
        this.obtenerTiposDocumentosIndentidad();
        this.ObtenerTiposPersonas();
        this.ObtenerFinesExportacion();
        this.ObtenerTiposPermanencia();

        this.registerForm = this.formBuilder.group({

        //datos solicitante
        tipoSolicitante: ['', Validators.required],
        tipoDocumentoSolicitante: ['', Validators.required],
        numeroDocumentoSolicitante: ['', Validators.required],
        numeroDocumentoSolicitante2: ['', Validators.required],
        nombreRazonSocialSolicitante: ['', Validators.required],
        paisExpedicionSolicitante: ['', Validators.required],

        //datos ubicacion
        departamentoUbicacion: ['', Validators.required],
        municipioUbicacion: ['', Validators.required],
        telefonoUbicacion: ['', Validators.required],
        direccionUbicacion: ['', Validators.required],
        correoUbicacion: ['', Validators.required],
        correoUbicacion2: ['', Validators.required],

        //datos intermediario
        requiereIntermediario: ['', Validators.required],
        tipoDocumentoIntermediario: ['', Validators.required],
        numeroDocumentoIntermediario: ['', Validators.required],
        numeroDocumentoIntermediario2: ['', Validators.required],
        nombreIntermediario: ['', Validators.required],
        paisExpedicionIntermediario: ['', Validators.required],
        ciudadIntermediario: ['', Validators.required],
        departamentoIntermediario: ['', Validators.required],
        municipioIntermediario: ['', Validators.required],
        departamentoUbicacionIntermediario: ['', Validators.required],
        municipioUbicacionIntermediario: ['', Validators.required],
        telefonoUbicacionIntermediario: ['', Validators.required],
        direccionUbicacionIntermediario: ['', Validators.required],
        correoUbicacionIntermediario: ['', Validators.required],
        correoUbicacionIntermediario2: ['', Validators.required],

        //datos destino
        PaisDestino: ['', Validators.required],
        ciudadDestino: ['', Validators.required],
        departamentoDestino: ['', Validators.required],
        municipioDestino: ['', Validators.required],
        direccionDestino: ['', Validators.required],
        finExportacion: ['', Validators.required],
        entidadDestino: ['', Validators.required],
        telefonoDestino: ['', Validators.required],
        tiempoPermanencia: ['', Validators.required],
        tipoPermanencia: ['', Validators.required],

        descripcion: ['', Validators.required],
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
  crearSolicitud(){    
    const solicitud: RequestModelCrearSolicitud = {
      SosTipoPersonaId: this.registerForm.value.tipoSolicitante.value, 
      DocIdSolicitante: this.registerForm.value.tipoDocumentoSolicitante.value, 
      SosNroDocumentoSolicitante:this.registerForm.value.actualizarDepartamentoDestino.numeroDocumentoSolicitante, 
      ZopId:this.registerForm.value.paisExpedicionSolicitante.value, 
      SosZonPadreId: this.registerForm.value.departamentoUbicacion.value, 
      SosZonId:this.registerForm.value.municipioUbicacion.value, 
      SosTelefonoSolicitante:this.registerForm.value.telefonoUbicacion, 
      SosDireccionSolicitante: this.registerForm.value.direccionUbicacion,
      SosCorreoSolicitante: this.registerForm.value.direccionUbicacion,
      Requiereintermediario: this.registerForm.value.requiereIntermediario,
      DocIdintermediario:this.registerForm.value.tipoDocumentoIntermediario,
      SosNroDocumentointermediario:this.registerForm.value.numeroDocumentoIntermediario,
      SosNombreintermediario: this.registerForm.value.nombreIntermediario,
      IntZopId: this.registerForm.value.paisExpedicionIntermediario.value,
      IntCiudad: this.registerForm.value.ciudadIntermediario.value,
      //IntCiudad: this.registerForm.value.municipioIntermediario.value,
      IntUbicacionCiudad:this.registerForm.value.municipioUbicacionIntermediario.value,
      SosTelefonointermediario:  this.registerForm.value.telefonoUbicacionIntermediario,
      SosDireccionintermediario: this.registerForm.value.direccionUbicacionIntermediario,
      IntUbicacionEmail:this.registerForm.value.correoUbicacionIntermediario,
      DestintoZopId:this.registerForm.value.PaisDestino.value,
      DestintoCiudad:this.registerForm.value.ciudadIntermediario.value,
      DestintoDireccion: this.registerForm.value.direccionDestino,
      TmsId: this.registerForm.value.finesExportacion.value,
      DestintoEntidad: this.registerForm.value.entidadDestino,
      DestintoTelefono:this.registerForm.value.telefonoDestino,
      DestintoTiempoPermanencia: this.registerForm.value.tiempoPermanencia,
      DestintoTipoTiempoPermanencia: this.registerForm.value.tipoPermanencia,

      //atrib missing
      AceptaHabeasdata:true,
      AnexoSolicitante:[],
      Anexointermediario:[],
      ReitegroObservaciones:"",
      SosNombreRepresentante:"",
      ProrrogaMotivo:"",
      ProrrogaFechaRegreso:Date.now,
      IntUbicacionZopId:0,
      Ciudad: "",
      ZonId:"",
      SosNombreSolicitante:"",
      SosCantidad:0,
      SosLugarExpedicion:"",
      ZopNombre:"",


    };

    console.log(solicitud);
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
    
    var paisSeleccionado= this.registerForm.value.PaisDestino.text;
    if(paisSeleccionado=='COLOMBIA')
      return true;
    else
      return false;
  }

  colombiaSeleccionadoExpedicionIntermediario(){
    
    var paisSeleccionado= this.registerForm.value.paisExpedicionIntermediario.text;
    if(paisSeleccionado=='COLOMBIA')
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
  //Obtiene los tipso de documentos permitidos
  obtenerDepartamentos() {
    this.service.obtenerDepartamentos().subscribe((data: ReturnModelLista) => { 
      if (data != undefined && data.success === true){
        this.data.departamentos= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  //Obtiene los tipso de documentos permitidos
  obtenerTiposDocumentosIndentidad() {
    this.service.obtenerTiposDocumentosIndentidad().subscribe((data: ReturnModelLista) => { 
      if (data != undefined && data.success === true){
        this.data.TiposDocumento= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  //Obtiene los tipso de documentos permitidos
  obtenerPaises() {
    this.service.ObtenerPaises().subscribe((data: ReturnModelLista) => { 
      if (data != undefined && data.success === true){
        this.data.paises= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  //Obtiene los tipso de documentos permitidos
  ObtenerTiposPersonas() {
    this.service.ObtenerTiposBasPersonas().subscribe((data: ReturnModelLista) => { 
      if (data != undefined && data.success === true){
        
        this.data.tiposSolicitante= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  ObtenerFinesExportacion() {
    this.service.ObtenerFinesExportacion().subscribe((data: ReturnModelLista) => { 
      
      if (data != undefined && data.success === true){
        
        this.data.finesExportacion= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  ObtenerTiposPermanencia() {
    this.service.ObtenerTiposPermanencia().subscribe((data: ReturnModelLista) => { 
      if (data != undefined && data.success === true){
        
        this.data.tiposPermanencia= data.result;
      }else {
        //TODO: controlar errores internos
        this.manejoErrorInterno(data);
      }
    }, (error) => {
      this.manejoErrorPeticion(error);
    });
  }

  actualizarDepartamentoUbicacion() {
    console.log(this.registerForm.value.departamentoUbicacion.value);
    this.data.municipiosUbicacion  = [];
     this.service.obtenerMunicipiosPorDepartamentoId(this.registerForm.value.departamentoUbicacion.value)
       .subscribe(
         (data) => {
          if (data != undefined && data.success === true){

           this.data.municipiosUbicacion = data.result;
          }else {
            //TODO: controlar errores internos
            this.manejoErrorInterno(data);
          }
          
         },
         (error) => {
          this.manejoErrorPeticion(error);
         }
       );
  }

  actualizarDepartamentoUbicacionIntermediario() {
    console.log(this.registerForm.value.departamentoUbicacionIntermediario.value);
    this.data.municipiosUbicacionIntermediario  = [];
     this.service.obtenerMunicipiosPorDepartamentoId(this.registerForm.value.departamentoUbicacionIntermediario.value)
       .subscribe(
         (data) => {
          if (data != undefined && data.success === true){

           this.data.municipiosUbicacionIntermediario = data.result;
          }else {
            //TODO: controlar errores internos
            this.manejoErrorInterno(data);
          }
          
         },
         (error) => {
          this.manejoErrorPeticion(error);
         }
       );
  }

  actualizarDepartamentoDestino() {
    debugger
    console.log(this.registerForm.value.departamentoDestino.value);
    this.data.municipiosDestino = [];
     this.service.obtenerMunicipiosPorDepartamentoId(this.registerForm.value.departamentoDestino.value)
       .subscribe(
         (data) => {
          if (data != undefined && data.success === true){

           this.data.municipiosDestino = data.result;
          }else {
            //TODO: controlar errores internos
            this.manejoErrorInterno(data);
          }
          
         },
         (error) => {
          this.manejoErrorPeticion(error);
         }
       );
  }

  actualizarDepartamentoIntermediario() {
    debugger
    console.log(this.registerForm.value.departamentoIntermediario.value);
    this.data.municipiosIntermediario = [];
     this.service.obtenerMunicipiosPorDepartamentoId(this.registerForm.value.departamentoIntermediario.value)
       .subscribe(
         (data) => {
          if (data != undefined && data.success === true){

           this.data.municipiosIntermediario = data.result;
          }else {
            //TODO: controlar errores internos
            this.manejoErrorInterno(data);
          }
          
         },
         (error) => {
          this.manejoErrorPeticion(error);
         }
       );
  }

  agregar(){
  }
  eliminar(){
  }

  manejoErrorPeticion(error: any){
  }

  manejoErrorInterno(data: any){
  }

}
