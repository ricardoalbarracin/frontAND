import { NgModule, Component, OnInit } from '@angular/core';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadDetalleComponent } from '../seguridad-detalle/seguridad-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';
import { MESSAGES } from '../../../services/messages-filters';

@NgModule({
  imports: [
    ReactiveFormsModule
  ]
})

@Component({
  selector: 'app-minsalud-consulta-seguridad',
  templateUrl: './seguridad-filtro.component.html',
  styleUrls: ['./seguridad-filtro.component.scss']
})
export class SeguridadFiltroComponent implements OnInit {

  errorMessage = {
    message: '',
    title: ''
  };
  successMessage = MESSAGES.SuccessDownload;
  successDownload = false;
  formGroup: FormGroup;
  formBuilder: any;

  constructor(public concultaService: MinsaludConsultaUtilService,
    public seguridadDetalle: SeguridadDetalleComponent) {
    this.formBuilder = new FormBuilder();
    this.inicializarForm();

    this.concultaService.inicializarFiltro();
    this.concultaService.asignarMostrarDetalleSinResultados(false);
    this.concultaService.opcionSeleccionada = this.concultaService.opciones[4];
    this.concultaService.asignarMostrarDetalle(false);
    this.concultaService.asignarDescargaCompleta(false);
  }


  inicializarForm() {
    this.formGroup = this.formBuilder.group({
      numero_documento: [''],
      naturaleza_juridica: [''],
      grupo: [''],
      servicio_nombre: [''],

      intramural_ambulatorio: [''],
      intramural_hospitalario: [''],
      extramural_domiciliario: [''],
      extramural_otras: [''],
      extramural_unidad: [''],
      telemedicina_centro: [''],
      telemedicina_institucion: [''],
      complejidad_baja: [''],
      complejidad_media: [''],
      complejidad_alta: [''],

      departamento_sede: [''],
      municipio_sede: [''],
      codigo_sede: [''],
      nombre_sede: [''],
      zona: [''],
      codigo_prestador: [''],
      clase_prestador: [''],
      empresa_estado: [''],
      nivel_atencion: [''],
      ese: [''],
      caracter_territorial: [''],
      recaptcha: new FormControl(['', Validators.requiredTrue])
    });
    this.concultaService.invalidForm = false;
    this.formGroup.get('recaptcha').setValue(null);
    this.concultaService.inicializarTablaDetalleServicios();
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

    // Validación: Cantidad minima de filtros = 1
    if (filterNumber > 0) {
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
      this.concultaService.setTablaDetalleDatos(this.concultaService.idsTablaSanciones);
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
    this.concultaService.getDetalleExcel(this.concultaService.tipoDetalle.seguridad).subscribe(
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
        link.download = 'Consulta de prestadores de salud ' + this.concultaService.tipoDetalle.seguridad + '.xls';
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
    this.concultaService.cargarListasServicios();
  }

  cargarMunicipios() {
    this.concultaService.cargarMunicipios(this.formGroup.get('departamento_sede').value.value);
    this.formGroup.get('municipio_sede').setValue(null);
  }
}
