import { Component, OnInit } from '@angular/core';
import { GenerarCertificadoForm } from './generar-certificado-forms'
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-generar-certificado',
  templateUrl: './generar-certificado.component.html',
  styleUrls: ['./generar-certificado.component.scss']
})
export class GenerarCertificadoComponent implements OnInit {

  GenerarCertificadoForm: GenerarCertificadoForm;
  generarCertificadoForm: FormGroup;
  invalidDatosForm: boolean = false;
  tipoConsulta: any;
  public listOficinasRegistro = [{ text: 'Bogotá, Oficina 1', value: 1}, { text: 'Medellín, Oficina 1', value: 2}];

  
  constructor(private router: Router, private activatedRoute:ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.GenerarCertificadoForm = new GenerarCertificadoForm();
    this.buildForm();
   }

  ngOnInit() {
    //this.tipoConsulta=history.state;
  }

  buildForm() {
    this.generarCertificadoForm = this.GenerarCertificadoForm.getForm();
    this.setStep("2");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  buscar() {
    if (!this.GenerarCertificadoForm.isValid()) {
      this.invalidDatosForm = true;
      return;
    }
    this.router.navigate(["/supernotariado/infoNumeroPin"]);
  }

}