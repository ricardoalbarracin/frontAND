import { NgModule, Component, OnInit, ViewChild } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PrestadoresDetalleComponent } from '../prestadores-detalle/prestadores-detalle.component';
import { MinsaludFiltroModel } from '../../../models/MinsaludFiltroModel';
import { GovcoTableModel, TableCellModel } from '@shared/forms/models/table.model';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { MESSAGES } from '../../../services/messages-filters';

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})

@Component({
  selector: 'app-minsalud-consulta-prestadores',
  templateUrl: './prestadores-filtro.component.html',
  styleUrls: ['./prestadores-filtro.component.scss']
})
export class PrestadoresFiltroComponent implements OnInit {

  formGroup: FormGroup;
  formBuilder: any;
  errorMessage = {
    message: '',
    title: ''
  };
  successMessage = MESSAGES.SuccessDownload;
  successDownload = false;
  invalidForm = false;


  constructor(public concultaService: MinsaludConsultaUtilService,
    public prestadoresDetalle: PrestadoresDetalleComponent) {
    this.formBuilder = new FormBuilder();
    this.inicializarForm();
    this.concultaService.inicializarFiltro();
    this.concultaService.asignarMostrarDetalleSinResultados(false);
    this.concultaService.opcionSeleccionada = this.concultaService.opciones[0];
    this.concultaService.asignarMostrarDetalle(false);
    this.concultaService.asignarDescargaCompleta(false);
  }


  inicializarForm() {
    this.formGroup = this.formBuilder.group({
      numero_documento: [''],
      naturaleza_juridica: [''],
      /* Información prestador */
      departamento_prestador: [''],
      municipio_prestador: [''],
      nombre_prestador: [''],
      codigo_prestador: [''],
      clase_prestador: [''],
      ese: [''],

      /* Información sede */
      nivel_atencion: [''],
      caracter_territorial: [''],
      recaptcha: new FormControl(['', Validators.requiredTrue])
    });
    this.concultaService.invalidForm = false;
    this.formGroup.get('recaptcha').setValue(null);
    this.concultaService.inicializarTablaDetallePrestadores();
  }

  buscar() {
    this.successDownload = false;
    if (this.formGroup.get('recaptcha').value === null) {
      this.concultaService.invalidRecaptcha = true;
      this.concultaService.invalidForm = true;
      this.errorMessage.message = MESSAGES.Recaptcha;
      this.errorMessage.title = MESSAGES.Sorry;
      this.concultaService.backToTop();
      return;
    }
    let filterNumber = 0;
    Object.keys(this.formGroup.controls).forEach(key => {
      let data = this.formGroup.get(key).value;
      if (typeof data === 'boolean') {
        data = data ? 'SI' : '';
      }
      if (typeof data === 'object' && data != null && data.value !== undefined) {
        data = data.value;
      }

      this.concultaService.filtro[key] = data;
      if (data && key !== 'recaptcha') {
        filterNumber += 1;
      }
    });

    // Validación: Cantidad minima de filtros = 1; >= 0 para quitar restriccion 
    if (filterNumber >= 0) {
      this.concultaService.invalidForm = false;
      this.concultaService.getDetalle(this.concultaService.tipoDetalle.prestadores).subscribe(
        (data) => this.success(data),
        (error) => {
          this.concultaService.invalidForm = true;
          this.errorMessage.message = MESSAGES.Error;
          this.errorMessage.title = MESSAGES.Sorry;
        }
      );
    } else {
      this.concultaService.invalidForm = true;
      this.errorMessage.message = MESSAGES.NoFilter;
      this.errorMessage.title = MESSAGES.Sorry;
      this.concultaService.backToTop();
      return;
    }
  }

  success(data) {
    if (data.length > 0) {
      this.concultaService.detalleConsulta = data;
      this.concultaService.setTablaDetalleDatos(this.concultaService.idsTablaPrestadores);
      this.concultaService.asignarMostrarDetalle(true);
    } else {
      this.concultaService.asignarMostrarDetalle(false);
      this.concultaService.invalidForm = true;
      this.errorMessage.message = MESSAGES.NoData;
      this.errorMessage.title = MESSAGES.Sorry;
      this.concultaService.backToTop();
    }
  }

  limpiar() {
    this.concultaService.asignarMostrarDetalle(false);
    this.concultaService.asignarMostrarDetalleSinResultados(false);
    this.concultaService.asignarDescargaCompleta(false);
    this.inicializarForm();
  }

  descargarResultados() {
    this.concultaService.getDetalleExcel(this.concultaService.tipoDetalle.prestadores).subscribe(
      (data) => {
        const newBlob = new Blob([data], { type: 'application/vnd.ms-excel' });
        // IE
        if (window.navigator && window.navigator.msSaveOrOpenBlob && this.concultaService.isIE()) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        // Otros navegadores
        const downloadURL = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'Consulta de prestadores de salud ' + this.concultaService.tipoDetalle.prestadores + '.xls';
        link.click();
        // Habilita mensaje success
        this.concultaService.asignarDescargaCompleta(true);
        this.successDownload = true;
        this.concultaService.invalidForm = false;
        this.concultaService.backToTop();
      },
      (error) => {
        this.concultaService.asignarDescargaCompleta(false);
        this.successDownload = false;
        this.concultaService.invalidForm = true;
        this.errorMessage.message = MESSAGES.ErrorDownload;
        this.errorMessage.title = MESSAGES.Sorry;
        this.concultaService.backToTop();
      }
    );
  }



  ngOnInit() {
    this.concultaService.asignarMostrarDetalle(false);
    this.concultaService.asignarMostrarDetalleSinResultados(false);
    this.concultaService.asignarDescargaCompleta(false);
    this.concultaService.inicializarFiltro();
    this.concultaService.cargarListasPrestadores();

  }

  cargarMunicipios() {
    this.concultaService.cargarMunicipios(this.formGroup.get('departamento_prestador').value.value);
    this.formGroup.get('municipio_prestador').setValue(null);
  }
}