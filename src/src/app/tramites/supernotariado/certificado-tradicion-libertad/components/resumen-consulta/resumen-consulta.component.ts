import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResumenConsultaForm }  from './resumen-consulta-forms'
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-resumen-consulta',
  templateUrl: './resumen-consulta.component.html',
  styleUrls: ['./resumen-consulta.component.scss']
})
export class ResumenConsultaComponent implements OnInit {
  
  ResumenConsultaForm: ResumenConsultaForm;
  resumenConsultaForm: FormGroup;
  tipoConsulta:string;
  
  constructor(private router: Router, private activatedRoute:ActivatedRoute) { 
    console.log(this.router.getCurrentNavigation().extras.state);
    this.ResumenConsultaForm = new ResumenConsultaForm();
    this.buildForm();
  }

  ngOnInit() {

    this.tipoConsulta = (history.state).tipoConsulta!=undefined?
                        (history.state).tipoConsulta:"Tipo de consulta";
    console.log(this.tipoConsulta);
  }

  buildForm() {
    this.resumenConsultaForm = this.ResumenConsultaForm.getForm();
    this.setStep("1");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  nuevaBusqueda() {     
    this.router.navigate(["/supernotariado/consultaIndicePropietarios"]);
  }

}