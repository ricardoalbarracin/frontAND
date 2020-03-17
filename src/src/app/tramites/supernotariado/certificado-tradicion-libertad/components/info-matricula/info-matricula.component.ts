import { Component, OnInit } from '@angular/core';
import { InfoMatriculaForm } from './info-matricula-forms'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-matricula',
  templateUrl: './info-matricula.component.html',
  styleUrls: ['./info-matricula.component.scss']
})
export class InfoMatriculaComponent implements OnInit {
  InfoMatriculaForm: InfoMatriculaForm;
  infoMatriculaForm: FormGroup;
  invalidDatosForm: boolean = false;

  constructor(private router: Router) {
    this.InfoMatriculaForm = new InfoMatriculaForm();
    this.buildForm();
   }

  ngOnInit() {
  }

  buildForm() {
    this.infoMatriculaForm = this.InfoMatriculaForm.getForm();
    this.setStep("2");
  }

  setStep(step: string) {
    const s = document.getElementsByTagName('govco-area-servicios');
    s[0].setAttribute('step', step);
  }

  cancelar() {
    this.router.navigate(["/supernotariado/consultaIndicePropietarios"]);
  }

}