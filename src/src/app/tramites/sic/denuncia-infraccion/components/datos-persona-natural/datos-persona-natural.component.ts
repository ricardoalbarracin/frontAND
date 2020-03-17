import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatosPersonaNaturalForm } from './datos-persona-natural-form'
import { Router } from '@angular/router'
import { SicUtilsService } from '../../services/sic-utils.service'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalService } from '@shared/dialog-modal/services/confirm-modal.service';
import jsonStrings from '@stringResources/tramites/denuncia-infraccion.json';
import { Persona, Natural, DireccionesEntity, EmailsEntity, TelefonosEntity, responseService } from '../../models/sic-models'
import { listaCalleLetra, listaBis, listaSufijoCardinal } from '../../services/common-data'

@Component({
  selector: 'app-datos-persona-natural',
  templateUrl: './datos-persona-natural.component.html',
  styleUrls: ['./datos-persona-natural.component.scss']
})

export class DatosPersonaNaturalComponent implements OnInit {

  mostrarDireccion: boolean;
  seleccionForm: FormGroup;
  seleccionSolucionForm: DatosPersonaNaturalForm;
  invalidForm: boolean = false;
  listaCalleCarrera: any = [];
  listaInformacionComplementaria: any = [];
  listaTipoDocumento: any = [];
  listaPais: any = [];
  listaDepartamento: any = [];
  listaCiudad: any = [];
  listaGenero: any = [];
  listaEscolaridad: any = [];
  listaEtnico: any = [];
  currentDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  textoTerminosCondiciones: string;
  direccionCorrespondencia = "Ej: Avenida Calle 32 # 13-83";
  informacionComplementaria = "Ej: Edificio Bávaro, apto 504 torre 2";
  tempDireccion: string;
  tempComplementos: string;
  persona: Persona;
  natural: Natural;
  direcciones: DireccionesEntity[];
  mail: EmailsEntity[];
  telefono: TelefonosEntity[];
  direccionCambiada = false;
  contadorComplementos = 0;
  listaCalleLetra: any = [
    { text: "A", value: "A" },
    { text: "B", value: "B" },
    { text: "C", value: "C" },
    { text: "D", value: "D" },
    { text: "E", value: "E" },
    { text: "F", value: "F" },
    { text: "G", value: "G" },
    { text: "H", value: "H" },
    { text: "I", value: "I" }];
  listaBis: any = [
    { text: "Bis", value: "Bis" }
  ];
  listaSufijoCardinal: any = [
    { text: "Norte", value: "Norte" },
    { text: "Sur", value: "Sur" },
    { text: "Oriente", value: "Oriente" },
    { text: "Occidente", value: "Occidente" }
  ];

  constructor(private router: Router, private sicUtils: SicUtilsService, private modalAlertService: ConfirmModalService) { }

  ngOnInit() {
    this.seleccionSolucionForm = new DatosPersonaNaturalForm();
    this.mostrarDireccion = true;
    this.buildForm();
    this.cargarListasGenericas();
    this.precargarDatosFormAnterior();
    this.setCurrentDate();
    this.cargarTextoTerminosCondiciones();
    this.setMaxDate();
  }

  precargarDatosFormAnterior() {
    this.seleccionForm.controls['tipo_documento'].setValue(sessionStorage.getItem('textotipoDocumento'));
    this.seleccionForm.controls['numero_documento'].setValue(sessionStorage.getItem('numeroDocumento'));
    this.seleccionForm.controls['correo'].setValue(sessionStorage.getItem('correo'));
  }

  setCurrentDate(): void {
    var currentDate = new Date();
    this.currentDate = {
      day: currentDate.getDate(),
      month: (currentDate.getMonth() + 1),
      year: currentDate.getFullYear()
    }
  }

  setMaxDate(): void {
    var maxDate = new Date();
    this.maxDate = {
      day: maxDate.getDate(),
      month: (maxDate.getMonth() + 1),
      year: (maxDate.getFullYear() - 15)
    }
  }

  buildForm() {
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  OcultarDireccion() {
    this.mostrarDireccion = !this.mostrarDireccion;
    this.limpiarDireccion();
  }

  agregarDireccionDefinitiva() {
    let segundo_valor = '';
    let tercer_valor = '';
    if (this.seleccionForm.value.segundo_valor_calle_cra.length > 0)
      segundo_valor = " # " + this.seleccionForm.value.segundo_valor_calle_cra;
    if (this.seleccionForm.value.tercer_valor_calle_cra.length > 0)
      tercer_valor = " - " + this.seleccionForm.value.tercer_valor_calle_cra;
    this.tempDireccion = this.seleccionForm.value.calle_cra.value + " " +
      this.seleccionForm.value.primer_valor_calle_cra + " " +
      this.seleccionForm.value.calle_letra.value + " " +
      this.seleccionForm.value.calle_bis.value + " " +
      this.seleccionForm.value.calle_bis_letra.value + " " +
      this.seleccionForm.value.calle_sufijo.value + " " +
      segundo_valor + " " +
      this.seleccionForm.value.calle_letra_segundo.value + " " +
      tercer_valor + " " +
      this.seleccionForm.value.calle_sufijo_tercer.value;
    this.tempDireccion = this.tempDireccion.split('undefined').join('').replace(/\s\s+/g, ' ');
    this.seleccionForm.controls['direccion_definitiva'].setValue(this.tempDireccion);
    this.direccionCambiada = true;
  }

  agregarComplementos() {
    this.contadorComplementos++;
    if (this.contadorComplementos < 3) {
      this.tempComplementos += " " + this.seleccionForm.value.informacion_complementaria.value + " " +
        this.seleccionForm.value.informacion_complementaria2;
      this.seleccionForm.controls['direccion_definitiva'].setValue(this.tempDireccion + " " +
        this.tempComplementos.split('undefined').join(''));
      this.seleccionForm.controls["informacion_complementaria"].setValue('');
      this.seleccionForm.controls["informacion_complementaria2"].setValue('');
    }
  }

  limpiarControl(nombre: string) {
    this.seleccionForm.controls[nombre].setValue('');
  }

  limpiarDireccion() {
    this.tempDireccion = '';
    this.tempComplementos = '';
    const controles = ["calle_cra", "primer_valor_calle_cra", "calle_letra", "calle_bis", "calle_bis_letra", "calle_sufijo",
      "segundo_valor_calle_cra", "calle_letra_segundo", "tercer_valor_calle_cra", "calle_sufijo_tercer", "informacion_complementaria",
      "informacion_complementaria2", "direccion_definitiva"]
    for (let control of controles)
      this.limpiarControl(control);
    this.contadorComplementos = 0;
  }

  guardarDireccionDefinitiva() {
    if (this.tempDireccion.length > 0) {
      this.direccionCambiada = true;
      this.direccionCorrespondencia = this.tempDireccion.split('undefined').join('');
      this.informacionComplementaria = this.tempComplementos.split('undefined').join('')
      this.contadorComplementos = 0;
      this.OcultarDireccion();
    }
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

  siguiente() {
    this.findInvalidControls();
    if (this.seleccionSolucionForm.isValid()) {
      this.registrarPersona();
    }
    else {
      this.invalidForm = true;
      return;
    }
  }

  lanzarModal() {
    this.modalAlertService.openDialogCustom(
      jsonStrings.messages.modal_aviso_privacidad,
      this.textoTerminosCondiciones,
      [{
        name: "Aceptar",
        value: true,
        styleClass: "btn-high",
        event: () => {
          this.router.navigate(['/sic/usuario_clave_acceso']);
        }
      }
      ],
      'none',
    );
  }

  registrarPersona() {
    this.natural = {
      saludo: "ES",
      primerNombre: this.seleccionForm.value.primer_nombre,
      segundoNombre: this.seleccionForm.value.segundo_nombre,
      primerApellido: this.seleccionForm.value.primer_apellido,
      segundoApellido: this.seleccionForm.value.segundo_apellido,
      escolaridad: this.seleccionForm.value.educacion.value,
      genero: this.seleccionForm.value.genero.value,
      grupoEtnico: this.seleccionForm.value.etnico.value,
    }
    this.mail = [{
      tipo: "PE",
      descripcion: this.seleccionForm.value.correo
    }]
    this.telefono = [{
      tipo: "CE",
      numero: this.seleccionForm.value.celular
    }
    ]
    this.direcciones = [{
      codigoPais: this.seleccionForm.value.pais.value,
      tipo: "EL",
      descripcion: this.direccionCorrespondencia + " " + this.informacionComplementaria,
      codigoCiudad: this.seleccionForm.value.ciudad.value,
      codigoRegion: this.seleccionForm.value.departamento.value,
      telefonos: this.telefono
    }]
    this.persona = {
      tipoPersona: sessionStorage.getItem('tipoPersona'),
      numeroDocumento: this.seleccionForm.value.numero_documento,
      tipoDocumento: sessionStorage.getItem('tipoDocumento'),
      natural: this.natural,
      emails: this.mail,
      direcciones: this.direcciones
    }
    console.error(this.persona);
    this.sicUtils.postRegistrarPersona(this.persona)
      .subscribe((data: responseService) => {
        if (data.persona != null) {
          sessionStorage.setItem('idPersona', data.persona.id.toString())
          this.lanzarModal();
        }
        else {
          console.error(data);
          return;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  cargarTextoTerminosCondiciones() {
    this.sicUtils.getListaGenericas("TERMINOS_CONDICIONES")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.textoTerminosCondiciones = data[0]["text"];
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  limpiar() {
    this.invalidForm = false;
    this.seleccionForm.reset();
  }

  cargarListaDepartamento() {
    this.seleccionForm.controls["departamento"].reset();
    this.sicUtils.getListaRegion(this.seleccionForm.value.pais.value)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaDepartamento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  cargarListaCiudad() {
    this.seleccionForm.controls["ciudad"].reset();
    this.sicUtils.getListaCiudad(this.seleccionForm.value.departamento.value)
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaCiudad = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
  }

  cargarListasGenericas() {
    this.sicUtils.getListaGenericas("TIPO_VIA_PRINCIPAL")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaCalleCarrera = data;
        }
      }, (error) => {
        console.error(error);
      }
      );
    this.sicUtils.getListaGenericas("COMPLEMENTOS_DIRECCION")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaInformacionComplementaria = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

    //Tipo de documento
    this.sicUtils.getListaGenericas("TIPO_DOCUMENTO_PERSONA")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaTipoDocumento = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

    //Pais
    this.sicUtils.getListaGenericas("PAIS")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaPais = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

    //Genero
    this.sicUtils.getListaGenericas("GENERO")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaGenero = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

    //Escolaridad
    this.sicUtils.getListaGenericas("ESCOLARIDAD")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaEscolaridad = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

    //Grupo Etnico
    this.sicUtils.getListaGenericas("GRUPO_ETNICO")
      .subscribe((data: any[]) => {
        if (data.length > 0) {
          this.listaEtnico = data;
        }
      }, (error) => {
        console.error(error);
      }
      );

  }


}
