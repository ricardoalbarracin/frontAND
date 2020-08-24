import { RequestModelActualizarSolicitud } from './../../models/requestmodelactualizarsolicitud';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators,ValidatorFn } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { ModalComponent } from '../modal/modal.component';
import { ReturnModelLista} from '../../models/ReturnModelLista';
import {RequestModelCrearSolicitud} from '../../models/requestmodelcrearsolicitud';
import { SubirarchivoComponent } from '../../../../../shared/subirarchivo/subirarchivo.component';
import { ResponseFileModel } from '../../../../../shared/models/responseFileModel';
import {Anexo} from '../../models/Anexo';
import { MustMatch } from '../../helpers/must-match.validator';
import { Session } from 'protractor';
import {ReturnModelCrearSolicitud} from '../../models/returnmodelcrearsolicitud';
@Component({
  selector: 'app-ingresar-solicitud',
  templateUrl: './ingresar-solicitud.component.html',
  styleUrls: ['./ingresar-solicitud.component.scss']
})
export class IngresarSolicitudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, public service: AutorizarExportacionUtilService) {
    this.requiereIntermediarioValor='NO';
   }
   sosId: string;
   registerForm: FormGroup;
   adjuntoPendienteSolicitante: ResponseFileModel;
   adjuntosSolicitante: ResponseFileModel[];
   adjuntoPendienteIntermediario: ResponseFileModel;
   adjuntosIntermediario: ResponseFileModel[];
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
   invalidForm: boolean = false;

   equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      if (target.touched && toMatch.touched) {
        const isMatch = target.value === toMatch.value;
        // set equal value error on dirty controls
        if (!isMatch && target.valid && toMatch.valid) {
          toMatch.setErrors({equalValue: targetKey});
          const message = targetKey + ' != ' + toMatchKey;
          return {'equalValue': message};
        }
        if (isMatch && toMatch.hasError('equalValue')) {
          toMatch.setErrors(null);
        }
      }

      return null;
    };
  }

  multipleValidator(  validations: any[]): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {

      validations.forEach(validation => validation(group));

      return null;
    };
  }

   ngOnInit() {

    this.adjuntosSolicitante =[];

    this.adjuntosIntermediario =[];
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
        numeroDocumentoSolicitante: ['12345677', Validators.required],
        numeroDocumentoSolicitante2: ['12345677', Validators.required],
        nombreRazonSocialSolicitante: ['NombreSolicitante', Validators.required],
        paisExpedicionSolicitante: ['', Validators.required],
        descripcionAdjuntoSolicitante: [''],

        //datos ubicacion
        departamentoUbicacion: ['', Validators.required],
        municipioUbicacion: ['', Validators.required],
        telefonoUbicacion: ['8888888888888', Validators.required],
        direccionUbicacion: ['DireccionUbicacionSolicitante', Validators.required],
        correoUbicacion: ['correoSolicitante@gmail.com', [Validators.required, Validators.email]],
        correoUbicacion2: ['correoSolicitante@gmail.com', [Validators.required, Validators.email]],

        //datos intermediario
        requiereIntermediario: [''],
        tipoDocumentoIntermediario: [''],
        numeroDocumentoIntermediario: ['789456'],
        numeroDocumentoIntermediario2: ['789456'],
        nombreIntermediario: ['NombreIntermediario'],
        paisExpedicionIntermediario: [''],
        ciudadIntermediario: ['CiudadIntermediario'],
        departamentoIntermediario: [''],
        municipioIntermediario: [''],
        departamentoUbicacionIntermediario: [''],
        municipioUbicacionIntermediario: [''],
        telefonoUbicacionIntermediario: ['77777777777'],
        direccionUbicacionIntermediario: ['DireccionUbicacionIntermediario'],
        correoUbicacionIntermediario: ['correoUbicacionIntermediario@gmail.com'],
        correoUbicacionIntermediario2: ['correoUbicacionIntermediario@gmail.com'],
        descripcionAdjuntoIntermediario: [''],

        //datos destino
        PaisDestino: ['', Validators.required],
        ciudadDestino: ['CiudadDestino', Validators.required],
        departamentoDestino: [''],
        municipioDestino: [''],
        direccionDestino: ['DireccionDestino', Validators.required],
        finExportacion: ['', Validators.required],
        entidadDestino: ['EntidadDestino'],
        telefonoDestino: ['999999999999'],
        tiempoPermanencia: ['6'],
        tipoPermanencia: [''],
        autoriza: ['', Validators.requiredTrue],
        formControlRecaptcha: ['', Validators.required]

       },
       {
          validator: this.multipleValidator(
            [
              this.equalValueValidator('numeroDocumentoSolicitante', 'numeroDocumentoSolicitante2'),
              this.equalValueValidator('correoUbicacion', 'correoUbicacion2'),
              this.equalValueValidator('numeroDocumentoIntermediario', 'numeroDocumentoIntermediario2'),
              this.equalValueValidator('correoUbicacionIntermediario', 'correoUbicacionIntermediario2'),

            ]
          )
        },
       );

       const tipoDocumentoIntermediario = this.registerForm.get('tipoDocumentoIntermediario');
       const numeroDocumentoIntermediario = this.registerForm.get('numeroDocumentoIntermediario');
       const numeroDocumentoIntermediario2 = this.registerForm.get('numeroDocumentoIntermediario2');
       const nombreIntermediario = this.registerForm.get('nombreIntermediario');
       const paisExpedicionIntermediario = this.registerForm.get('paisExpedicionIntermediario');
       const ciudadIntermediario = this.registerForm.get('ciudadIntermediario');
       const departamentoIntermediario = this.registerForm.get('departamentoIntermediario');
       const municipioIntermediario = this.registerForm.get('municipioIntermediario');
       const departamentoUbicacionIntermediario = this.registerForm.get('departamentoUbicacionIntermediario');
       const municipioUbicacionIntermediario = this.registerForm.get('municipioUbicacionIntermediario');
       const telefonoUbicacionIntermediario = this.registerForm.get('telefonoUbicacionIntermediario');
       const direccionUbicacionIntermediario = this.registerForm.get('direccionUbicacionIntermediario');
       const correoUbicacionIntermediario = this.registerForm.get('correoUbicacionIntermediario');
       const correoUbicacionIntermediario2 = this.registerForm.get('correoUbicacionIntermediario2');

       const ciudadDestino = this.registerForm.get('ciudadDestino');
       const departamentoDestino = this.registerForm.get('departamentoDestino');
       const municipioDestino = this.registerForm.get('municipioDestino');


       this.registerForm.get('requiereIntermediario').valueChanges
        .subscribe(requiereIntermediario => {

          if (requiereIntermediario== 'SI') {

            tipoDocumentoIntermediario.setValidators([Validators.required]);
            numeroDocumentoIntermediario.setValidators([Validators.required]);
            numeroDocumentoIntermediario2.setValidators([Validators.required]);


            correoUbicacionIntermediario.setValidators([Validators.required, Validators.email]);
            correoUbicacionIntermediario2 .setValidators([Validators.required, Validators.email]);

          }
          else
          {
            tipoDocumentoIntermediario.setValidators(null);
            numeroDocumentoIntermediario.setValidators(null);
            numeroDocumentoIntermediario2.setValidators(null);
            nombreIntermediario.setValidators(null);
            paisExpedicionIntermediario.setValidators(null);
            ciudadIntermediario.setValidators(null);
            departamentoIntermediario.setValidators(null);
            municipioIntermediario.setValidators(null);
            departamentoUbicacionIntermediario.setValidators(null);
            municipioUbicacionIntermediario.setValidators(null);
            telefonoUbicacionIntermediario.setValidators(null);
            direccionUbicacionIntermediario.setValidators(null);
            correoUbicacionIntermediario.setValidators(null);
            correoUbicacionIntermediario2.setValidators(null);
          }

          tipoDocumentoIntermediario.updateValueAndValidity();
          numeroDocumentoIntermediario.updateValueAndValidity();
          numeroDocumentoIntermediario2.updateValueAndValidity();
          nombreIntermediario.updateValueAndValidity();
          paisExpedicionIntermediario.updateValueAndValidity();
          ciudadIntermediario.updateValueAndValidity();
          departamentoIntermediario.updateValueAndValidity();
          municipioIntermediario.updateValueAndValidity();
          departamentoUbicacionIntermediario.updateValueAndValidity();
          municipioUbicacionIntermediario.updateValueAndValidity();
          telefonoUbicacionIntermediario.updateValueAndValidity();
          direccionUbicacionIntermediario.updateValueAndValidity();
          correoUbicacionIntermediario.updateValueAndValidity();
          correoUbicacionIntermediario2.updateValueAndValidity();

        });



        this.registerForm.get('PaisDestino').valueChanges
        .subscribe(pais => {
          if (pais.text === 'COLOMBIA') {
            ciudadDestino.setValidators(null);
            departamentoDestino.setValidators([Validators.required]);
            municipioDestino.setValidators([Validators.required]);
          }
          else
          {
            ciudadDestino.setValidators([Validators.required]);
            departamentoDestino.setValidators(null);
            municipioDestino.setValidators(null);
          }
          departamentoDestino.updateValueAndValidity();
          municipioDestino.updateValueAndValidity();
          ciudadDestino.updateValueAndValidity();
        });
       this.cargarDatosStorage();
   }

   scrollControInvalido(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

   get f() { return this.registerForm.controls; }

   open(content) {

    if (this.registerForm.valid){
      this.modalService.open(content, { size: "xl", scrollable: true });
    }
    else{
      this.scrollControInvalido();
      this.invalidForm = true;
    }
    /*this.asignarVariables();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.service.asignarFormularioInvalido(true);
    }

    this.scrollControInvalido();


    if (this.submitted && !this.service.formularioInvalido) {
        this.modalService.open(content, { size: "xl", scrollable: true });
    }*/


  }
  crearSolicitudModel(){

    const solicitud: RequestModelCrearSolicitud = {
      SosTipoPersonaId: parseInt(this.registerForm.value.tipoSolicitante.value, 10),
      DocIdSolicitante: parseInt(this.registerForm.value.tipoDocumentoSolicitante.value, 10),
      SosNroDocumentoSolicitante:this.registerForm.value.numeroDocumentoSolicitante,
      ZopId:parseInt(this.registerForm.value.paisExpedicionSolicitante.value, 10),
      SosZonPadreId: this.registerForm.value.departamentoUbicacion.value,
      SosZonId:"11001",//this.registerForm.value.municipioUbicacion.value,
      Ciudad:"Bogota",//this.registerForm.value.municipioUbicacion.text,
      SosTelefonoSolicitante:this.registerForm.value.telefonoUbicacion,
      SosDireccionSolicitante: this.registerForm.value.direccionUbicacion,
      SosCorreoSolicitante: this.registerForm.value.direccionUbicacion,
      Requiereintermediario: this.registerForm.value.requiereIntermediario=='SI'? true: false,
      DocIdintermediario: this.registerForm.value.tipoDocumentoIntermediario? Number(this.registerForm.value.tipoDocumentoIntermediario.value): null,
      SosNroDocumentointermediario:this.registerForm.value.numeroDocumentoIntermediario,
      SosNombreintermediario: this.registerForm.value.nombreIntermediario,
      IntZopId: parseInt(this.registerForm.value.paisExpedicionIntermediario.value, 10),
      IntCiudad: this.registerForm.value.ciudadIntermediario,
      //IntCiudad: this.registerForm.value.municipioIntermediario.value,
      IntUbicacionCiudad:"11001",//this.registerForm.value.municipioUbicacionIntermediario.value,
      SosTelefonointermediario:  this.registerForm.value.telefonoUbicacionIntermediario,
      SosDireccionintermediario: this.registerForm.value.direccionUbicacionIntermediario,
      IntUbicacionEmail:this.registerForm.value.correoUbicacionIntermediario,
      DestinoZopId:parseInt(this.registerForm.value.PaisDestino.value, 10),
      DestinoCiudad:this.registerForm.value.ciudadDestino,
      DestinoDireccion: this.registerForm.value.direccionDestino,
      TmsId: parseInt(this.registerForm.value.finExportacion.value, 10),
      DestinoEntidad: this.registerForm.value.entidadDestino,
      DestinoTelefono:this.registerForm.value.telefonoDestino,
      DestinoTiempoPermanencia: this.registerForm.value.tiempoPermanencia ? parseInt(this.registerForm.value.tiempoPermanencia,10): null,
      DestinoTipoTiempoPermanencia:this.registerForm.value.tipoPermanencia ? parseInt(this.registerForm.value.tipoPermanencia.value, 10): null,
      AceptaHabeasdata:this.registerForm.value.autoriza,
      SosNombreSolicitante:this.registerForm.value.nombreRazonSocialSolicitante,
      //atrib missing

      AnexoSolicitante:this.mappAnexo(this.adjuntosSolicitante),
      Anexointermediario:this.mappAnexo(this.adjuntosIntermediario),
      ReitegroObservaciones:"",//por defecto vacio
      SosNombreRepresentante:this.registerForm.value.nombreRazonSocialSolicitante,
      ProrrogaMotivo:"", //por defecto vacio
      ProrrogaFechaRegreso:null,//por defecto
      IntUbicacionZopId:Number(this.registerForm.value.departamentoUbicacionIntermediario.value),
      ZonId:"01001",
      SosCantidad: 1,//1 valor fijo
      SosLugarExpedicion:"01001",//valor fijo
      ZopNombre:this.registerForm.value.paisExpedicionSolicitante.text,


    };

    return solicitud;
  }

  AfterViewInit(){
    //this.cargarDatosStorage();
  }

  mappAnexo(adjuntosSolicitante: ResponseFileModel[]){
    let anexos:Anexo[]=[];
    adjuntosSolicitante.forEach(i=>{
      const anexo: Anexo = {
      NombreArchivo:i.FileName,
      ArchivoBinario: i.FileContent,
      Descripcion: i.Description,
      AnexoId:0,
      FicId:0,
      NroDocumentoSolicitante:"",
      PrestamoId:0,
      SeccionId:0,
      SolicitudId:0,
      TipoDocumentoSolicitante:""
    }
    anexos.push(anexo);
  });
    return anexos;
  }

  asignarVariables(){
    this.submitted = true;
    this.service.asignarFormularioInvalido(false);
  }

  closeModal() {
    this.service.asignarFormularioInvalido(false);
    this.modalService.dismissAll();

  }

  guardar(content){
    if (!this.registerForm.valid){
      this.service.asignarPaso(3);
      this.service.asignarpasoIngresar(2);
      debugger;
      let solicitud=this.crearSolicitudModel();
      if(sessionStorage.sosId)
      {
        this.service.actualizarSolicitud(this.mapearActualizarSolicitud(solicitud)).subscribe((result: any) => {
          if(result.success && result.result.operacionExitosa)
          {
            if(result.result.success)
            {
              debugger;
              this.sosId = result.result.solicitudSalidaObra.sosConsecutivoIndice;
              this.modalService.open(content, { size: "xl", scrollable: true });
              sessionStorage.clear();
            }
          }
        }, (error) => {
          this.manejoErrorPeticion(error);
        });

      }
      else
      {
        this.service.registrarSolicitud(solicitud).subscribe((result: any) => {

          if(result.success && result.result.operacionExitosa)
          {
            if(result.result.success)
            {
              //debugger;
              this.sosId = result.result.solicitudSalidaObra.sosConsecutivoIndice;
              this.modalService.open(content, { size: "xl", scrollable: true });
            }
          }
        }, (error) => {
          this.manejoErrorPeticion(error);
        });
      }
    }
    else{
    this.scrollControInvalido();
    this.invalidForm = true;
    }

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
           if(sessionStorage)
              this.valoresConsulta.municipioUbicacion = sessionStorage.zonId;
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

  SeleccionarArchivoSolicitante() {
    const modalRef = this.modalService.open(SubirarchivoComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });

    modalRef.componentInstance.uploaded.subscribe((e) => {
      this.adjuntoPendienteSolicitante = e;
      modalRef.close();

    })

    modalRef.componentInstance.canceled.subscribe(($e) => {
      modalRef.close();
    })
  }

  SeleccionarArchivoIntermediario() {
    const modalRef = this.modalService.open(SubirarchivoComponent, {
      size: 'lg',
      backdrop: "static",
      keyboard: true
    });

    modalRef.componentInstance.uploaded.subscribe((e) => {
      this.adjuntoPendienteIntermediario = e;
      modalRef.close();
    })

    modalRef.componentInstance.canceled.subscribe(($e) => {
      modalRef.close();
    })
  }

  agregarArchivoSolicitante(){

    if(this.adjuntoPendienteSolicitante != null)
    {
      this.adjuntoPendienteSolicitante.Description = this.registerForm.value.descripcionAdjuntoSolicitante;
      this.adjuntoPendienteSolicitante.FileContent = this.adjuntoPendienteSolicitante.FileContent.split(',')[1];
      this.adjuntosSolicitante.push(this.adjuntoPendienteSolicitante);
      this.adjuntoPendienteSolicitante=null;
    }
  }

  eliminarArchivoSolicitante(index: number){
    this.adjuntosSolicitante.splice(index, 1);
  }

  agregarArchivoIntermediario(){

    if(this.adjuntoPendienteIntermediario != null)
    {
      this.adjuntoPendienteIntermediario.Description = this.registerForm.value.descripcionAdjuntoIntermediario;
      this.adjuntoPendienteIntermediario.FileContent = this.adjuntoPendienteIntermediario.FileContent.split(',')[1];
      this.adjuntosIntermediario.push(this.adjuntoPendienteIntermediario);
      this.adjuntoPendienteIntermediario=null;
    }
  }

  eliminarArchivoIntermediario(index: number){
    this.adjuntosIntermediario.splice(index, 1);
  }

  public valoresConsulta:any = {
    tipo_solicitante: "",
    tipo_documento: "",
    docIdIntermediario:"",
    municipioUbicacion:"",
    departamentoUbicacion:"",
    destinoZopId:"",
    destinoFinExportacion:"",
    destinoTipoTiempoPermanencia:"",
    paisExpedicionSolicitante:"",
    paisExpedicionIntermediario:"",
    departamentoUbicacionIntermediario:"",
    municipioUbicacionIntermediario:""

  };

  mapearActualizarSolicitud(solicitud:RequestModelCrearSolicitud){
    let actualizarSolicitud: RequestModelActualizarSolicitud = {
      SosId: sessionStorage.sosId,
      Ciudad : solicitud.Ciudad,
      DocIdSolicitante : solicitud.DocIdSolicitante,
      ZopId : solicitud.ZopId,
      ZonId : solicitud.ZonId,
      SosNombreSolicitante : solicitud.SosNombreSolicitante,
      SosNroDocumentoSolicitante : solicitud.SosNroDocumentoSolicitante,
      SosNroFoliosAnexos : 0,
      SosFechaParaDarConcepto : '',
      SosCantidad : solicitud.SosCantidad,
      TmsId : solicitud.TmsId,
      SosLugarExpedicion : solicitud.SosLugarExpedicion,
      SosDireccionSolicitante : solicitud.SosDireccionSolicitante,
      SosTelefonoSolicitante : solicitud.SosTelefonoSolicitante,
      SosCorreoSolicitante : solicitud.SosCorreoSolicitante,
      SosNombreintermediario : solicitud.SosNombreintermediario,
      DocIdintermediario : solicitud.DocIdintermediario,
      SosNroDocumentointermediario : solicitud.SosNroDocumentointermediario,
      SosDireccionintermediario : solicitud.SosDireccionintermediario,
      SosTelefonointermediario : solicitud.SosTelefonointermediario,
      SosSintointermediario : '',
      SosSintoAnexos : '',
      SosSintoProrroga : '',
      ZopNombre : solicitud.ZopNombre,
      SosTipoPersonaId : solicitud.SosTipoPersonaId,
      SosZonPadreId : solicitud.SosZonPadreId,
      SosZonId : solicitud.SosZonId,
      IntZopId : solicitud.IntZopId,
      IntCiudad : solicitud.IntCiudad,
      IntUbicacionZopId : solicitud.IntUbicacionZopId,
      IntUbicacionCiudad :solicitud.IntUbicacionCiudad,
      IntUbicacionEmail : solicitud.IntUbicacionEmail,
      ProrrogaFechaRegreso : solicitud.ProrrogaFechaRegreso,
      ProrrogaMotivo :solicitud.ProrrogaMotivo,
      DestinoZopId : solicitud.DestinoZopId,
      DestinoCiudad :solicitud.DestinoCiudad,
      DestinoDireccion :solicitud.DestinoDireccion,
      DestinoFintExportacion : '',
      DestinoEntidad :solicitud.DestinoEntidad,
      DestinoTelefono :solicitud.DestinoTelefono,
      DestinoTiempoPermanencia : solicitud.DestinoTiempoPermanencia,
      DestinoTipoTiempoPermanencia : solicitud.DestinoTipoTiempoPermanencia,
      ReitegroObservaciones :solicitud.ReitegroObservaciones,
      SosNombreRepresentante :solicitud.SosNombreRepresentante,
      AceptaHabeasdata :solicitud.AceptaHabeasdata,
      Requiereintermediario : solicitud.Requiereintermediario,
      AnexoSolicitante :solicitud.AnexoSolicitante
    }
    return actualizarSolicitud;
  }

  cargarDatosStorage() {
    if (sessionStorage.numero_documento) {

      this.valoresConsulta.tipo_documento = sessionStorage.tipo_documento;
      this.registerForm.controls.numeroDocumentoSolicitante.setValue(sessionStorage.numero_documento);
      this.registerForm.controls.numeroDocumentoSolicitante2.setValue(sessionStorage.numero_documento);
      this.registerForm.controls.nombreRazonSocialSolicitante.setValue(sessionStorage.nombre_solicitante);
      this.valoresConsulta.paisExpedicionSolicitante = sessionStorage.zopId;


      this.registerForm.controls.telefonoUbicacion.setValue(sessionStorage.telefono_solicitante);
      this.registerForm.controls.direccionUbicacion.setValue(sessionStorage.direccion_solicitante);
      this.registerForm.controls.correoUbicacion.setValue(sessionStorage.correo_solicitante);
      this.registerForm.controls.correoUbicacion2.setValue(sessionStorage.correo_solicitante);

      this.registerForm.controls.requiereIntermediario.setValue(sessionStorage.sosSinoIntermediario === 'S' ? "SI" : "NO");
      this.valoresConsulta.docIdIntermediario = sessionStorage.docIdIntermediario;
      this.registerForm.controls.numeroDocumentoIntermediario.setValue(sessionStorage.sosNroDocumentoIntermediario);
      this.registerForm.controls.numeroDocumentoIntermediario2.setValue(sessionStorage.sosNroDocumentoIntermediario);
      this.registerForm.controls.nombreIntermediario.setValue(sessionStorage.sosNombreIntermediario);
      this.service.ConsultarSolicitudxID(Number(sessionStorage.sosId)).subscribe(data => {
        if(data.success){
          debugger;
          this.valoresConsulta.departamentoUbicacion = data.result.solicitud.sosZonPadreId.toString();
          this.valoresConsulta.tipo_solicitante = data.result.solicitud.sosTipoPersonaId.toString().trim();
          this.valoresConsulta.paisExpedicionIntermediario = data.result.solicitud.intZopId.toString();
          this.registerForm.controls.ciudadIntermediario.setValue(data.result.intCiudad);
          this.valoresConsulta.departamentoUbicacionIntermediario = data.result.solicitud.intUbicacionZopId.toString();
          this.valoresConsulta.municipioUbicacionIntermediario = data.result.solicitud.intUbicacionCiudad.toString();
          this.registerForm.controls.telefonoUbicacionIntermediario.setValue(data.result.solicitud.sosTelefonoIntermediario);
          this.registerForm.controls.direccionUbicacionIntermediario.setValue(data.result.solicitud.sosDireccionIntermediario);
          this.registerForm.controls.correoUbicacionIntermediario.setValue(data.result.solicitud.intUbicacionEmail);
          this.registerForm.controls.correoUbicacionIntermediario2.setValue(data.result.solicitud.intUbicacionEmail);
          this.valoresConsulta.destinoZopId = data.result.solicitud.destinoZopId.toString();
          this.valoresConsulta.destinoFinExportacion = data.result.solicitud.destinoFinExportacion.toString();
          this.valoresConsulta.municipio = data.result.solicitud.intZopId.toString();
          this.valoresConsulta.DestinoTipoTiempoPermanencia = data.result.solicitud.destinoTipoTiempoPermanencia.toString();
          this.registerForm.controls.ciudadDestino.setValue(data.result.solicitud.destinoCiudad);
          this.registerForm.controls.direccionDestino.setValue(data.result.solicitud.destinoDireccion);
          this.registerForm.controls.entidadDestino.setValue(data.result.solicitud.destinoEntidad);
          this.registerForm.controls.telefonoDestino.setValue(data.result.solicitud.destinoTelefono);
          this.registerForm.controls.tiempoPermanencia.setValue(data.result.solicitud.destinoTiempoPermanencia);
        }
      });

      this.service.ObtenerListaAnexos(Number(sessionStorage.sosId)).subscribe(data => {
        if(data.result.listaAnexos){
          for(let element of data.result.listaAnexos)
          {
            let archivo:ResponseFileModel = {
              Description : element.descripcion,
              FileContent : element.archivoBinario,
              FileName : element.nombreArchivo.split('\\').pop().split('/').pop(),
              Type : ''
            } ;
            if(element.seccionId === 1)
              this.adjuntosSolicitante.push(archivo);
            else
              this.adjuntosIntermediario.push(archivo);
          }
        }
      });

    }
  }

}
