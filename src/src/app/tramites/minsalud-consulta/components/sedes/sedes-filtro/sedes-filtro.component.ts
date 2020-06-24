import { NgModule, Component, OnInit } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SedesDetalleComponent } from '../sedes-detalle/sedes-detalle.component';
import { GovcoTableModel, TableCellModel } from '@shared/forms/models/table.model';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { MESSAGES } from '../../../services/messages-filters';

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})

@Component({
  selector: 'app-minsalud-consulta-sedes',
  templateUrl: './sedes-filtro.component.html',
  styleUrls: ['./sedes-filtro.component.scss']
})
export class SedesFiltroComponent implements OnInit {

  errorMessage = {
    message: '',
    title: ''
  };
  successMessage = MESSAGES.SuccessDownload;
  successDownload = false;
  formGroup: FormGroup;
  formBuilder: any;

  constructor(public concultaService: MinsaludConsultaUtilService,
    public sedesDetalle: SedesDetalleComponent) {
    this.formBuilder = new FormBuilder();
    this.inicializarForm();

    this.concultaService.inicializarFiltro();
    this.concultaService.asignarMostrarDetalleSinResultados(false);
    this.concultaService.opcionSeleccionada = this.concultaService.opciones[1];
    this.concultaService.asignarMostrarDetalle(false);
    this.concultaService.asignarDescargaCompleta(false);
  }

  inicializarForm() {
    this.formGroup = new FormGroup({
      formControlDocumentoSede: new FormControl(),
      formControlNaturalezaJuridica: new FormControl(),
      formControlClasePrestador: new FormControl(),
      formControlEmpresaSocialEstado: new FormControl(),
      formControlNivelAtencionPrestador: new FormControl(),
      formControlCaracterTerritorial: new FormControl(),
      formControlDepartamentoPrestador: new FormControl(),
      formControlMunicipioPrestador: new FormControl(),
      formControlDepartamentoSede: new FormControl(),
      formControlMunicipioSede: new FormControl(),
      formControlListaSedePrincipal: new FormControl(),
      formControlZona: new FormControl(),
      formControlSedePrincipal: new FormControl(),
      formControlCodigoPrestador: new FormControl(),
      formCodigoSede: new FormControl(),
      formControlNombreSede: new FormControl(),
      formControlRecaptcha: new FormControl(['', Validators.requiredTrue])
    });
    this.concultaService.invalidForm = false;
    this.formGroup.get('formControlRecaptcha').setValue(null);

    this.formGroup = this.formBuilder.group({
      numero_documento: [''],

      /* Información prestador */
      departamento_prestador: [''],
      municipio_prestador: [''],
      codigo_prestador: [''],
      nombre_prestador: [''],
      ese: [''],
      clase_prestador: [''],
      nivel_atencion: [''],

      /* Información sede */
      naturaleza_juridica: [''],
      caracter_territorial: [''],
      departamento_sede: [''],
      municipio_sede: [''],
      codigo_sede: [''],
      sede_principal: [''],
      nombre_sede: [''],
      zona: [''],
      recaptcha: new FormControl(['', Validators.requiredTrue])
    });
    this.concultaService.invalidForm = false;
    this.formGroup.get('recaptcha').setValue(null);
    this.concultaService.inicializarTablaDetalleSedes();

  }

  buscar() {
    this.concultaService.invalidRecaptcha = false;
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
      this.concultaService.getDetalle(this.concultaService.tipoDetalle.sanciones).subscribe(
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
      this.concultaService.setTablaDetalleDatos(this.concultaService.idsTablaSedes);
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
    this.concultaService.inicializarFiltro();
    this.inicializarForm();
    this.concultaService.backToTop();
  }

  descargarResultados() {
    this.concultaService.getDetalleExcel(this.concultaService.tipoDetalle.sedes).subscribe(
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
        link.download = 'Consulta de prestadores de salud ' + this.concultaService.tipoDetalle.sedes + '.xls';
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
    this.concultaService.cargarListasSedes();
  }

  cargarMunicipios() {
    this.concultaService.cargarMunicipios(this.formGroup.get('departamento_prestador').value.value);
    this.formGroup.get('municipio_prestador').setValue(null);
  }

  cargarMunicipios2() {
    this.concultaService.cargarMunicipios2(this.formGroup.get('departamento_sede').value.value);
    this.formGroup.get('municipio_sede').setValue(null);
  }
}
