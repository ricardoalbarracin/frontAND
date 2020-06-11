import { Component, OnInit } from "@angular/core";
import { ConsultaForm } from "../consulta/consulta.form";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.scss"],
})
export class ConsultaComponent implements OnInit {
  seleccionForm: FormGroup;
  seleccionSolucionForm: ConsultaForm;
  invalidForm: boolean = false;
  mostrarResultados: boolean = false;

  constructor() {}

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultaForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
  }

  RealizarConsulta() {
    if (this.seleccionSolucionForm.isValid()) {
      this.mostrarResultados = !this.mostrarResultados;
    } else {
      this.invalidForm = true;
      return;
    }
  }
}
