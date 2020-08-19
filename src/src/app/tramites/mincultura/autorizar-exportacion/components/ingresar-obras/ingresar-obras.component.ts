import { ResponseFileModel } from './../../../../../shared/models/responseFileModel';
import { SubirarchivoComponent } from './../../../../../shared/subirarchivo/subirarchivo.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { ModalComponent } from '../modal/modal.component';
import { ReturnModelLista } from '../../models/ReturnModelLista';

@Component({
  selector: 'app-ingresar-obras',
  templateUrl: './ingresar-obras.component.html',
  styleUrls: ['./ingresar-obras.component.scss']
})
export class IngresarObrasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public modalService: NgbModal, public service: AutorizarExportacionUtilService) {
    this.obras = ({ consecutivo: 1, titulo: 'Titulo ' + 1, anio: 2019, registro: 'registro ' + 1 });
  }
  tipoArchivo = 'image/gif, image/jpeg, image/png';
  get f() { return this.registerForm.controls; }
  fotografiaPendienteObra: ResponseFileModel;
  fotografiasObra: ResponseFileModel[];
  obras: any = [{ consecutivo: 0, titulo: '', anio: 0, registro: '' }];
  obraBien: any;
  registerForm: FormGroup;
  invalidForm = false;
  submitted = false;
  data: any = {
    grupo: [],
    subgrupo: [],
    categoria: [],
    autor: [],
    firmado: [],
    epoca: [],
    TiposDocumento: []
  };

  public valoresConsulta: any = {
    grupo: ''
  };

  ngOnInit() {
    this.fotografiasObra = [];
    this.obtenerTiposDocumentosIndentidad();
    this.registerForm = this.formBuilder.group({
      // datos ingresar obra
      grupo: ['', Validators.required],
      subgrupo: ['', Validators.required],
      categoria: ['', Validators.required],
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
      firmado: ['', Validators.required],
      anoElaboracion: [''],
      epoca: ['', Validators.required],

      // dimensiones
      alto: ['', Validators.required],
      ancho: ['', Validators.required],
      largo: [''],
      profundidad: [''],
      espesor: [''],
      cantidad: [''],
      observaciones: [''],

      // propietario
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      propietarioNombre: ['', Validators.required],
      formControlRecaptcha: ['', Validators.required]
    });
  }

  // Obtiene los tipso de documentos permitidos
  obtenerTiposDocumentosIndentidad() {
    this.service.obtenerTiposDocumentosIndentidad().subscribe((data: ReturnModelLista) => {
      if (data !== undefined && data.success === true) {
        this.data.TiposDocumento = data.result;
      } else {
        // TODO: controlar errores internos

      }
    }, (error) => {

    });
  }

  scrollControInvalido(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  SeleccionarFotografiaObra() {
    const modalRef = this.modalService.open(SubirarchivoComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });
    (modalRef.componentInstance as SubirarchivoComponent).type = this.tipoArchivo;
    modalRef.componentInstance.uploaded.subscribe((e) => {
      this.fotografiaPendienteObra = e;
      modalRef.close();
    });
    modalRef.componentInstance.canceled.subscribe(($e) => {
      modalRef.close();
    });
  }

  agregarFotografiaObra() {
    if (this.fotografiaPendienteObra != null) {
      this.fotografiaPendienteObra.Description = this.registerForm.value.descripcionAdjuntoSolicitante;
      // this.registerForm.value.descripcionAdjuntoSolicitante = "";
      this.fotografiasObra.push(this.fotografiaPendienteObra);
      this.fotografiaPendienteObra = null;
    }
  }

  eliminarFotografiaObra(index: number) {
    this.fotografiasObra.splice(index, 1);
  }

  open(content) {
    this.asignarVariables();
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.scrollControInvalido();
      this.invalidForm = true;
      /* this.service.asignarLlega(9);
      this.service.asignarFormularioInvalido(true); */
      return;
    }
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }


  asignarVariables() {
    this.submitted = true;
    this.service.asignarFormularioInvalido(false);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  guardar(content) {
    this.asignarVariablesEnviarMinisterio();
    if (this.service.paso === 5) {
      this.modalService.open(content, { size: 'xl', scrollable: true });
    }

  }

  asignarVariablesEnviarMinisterio() {
    this.service.asignarFormularioInvalido(false);
    if (this.service.paso === 3) {
      this.service.asignarPaso(4);
      this.service.asignarpasoIngresar(-1);
    } else if (this.service.paso === 4) {
      this.service.asignarPaso(5);
      this.service.asignarpasoIngresar(-1);
    } else {
      /*PROBAR QUE LLEGA DESDE PRUEBAS UNITARIAS*/
      this.service.asignarPaso(-1);
      // this.modalService.open(content, { size: "xl", scrollable: true });
    }

  }

  cancelar() {
    this.service.asignarPaso(1);
    this.service.asignarpasoIngresar(1);
  }

}
