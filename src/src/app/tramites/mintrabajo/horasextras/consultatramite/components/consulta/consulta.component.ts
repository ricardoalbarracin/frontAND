import { Component, OnInit } from "@angular/core";
import { ConsultaForm } from "../consulta/consulta.form";
import { FormGroup } from "@angular/forms";
import { UtilsService } from 'src/app/tramites/mintrabajo/sharedmintrabajo/utils/utils.service';

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

  constructor(private utils:UtilsService) {}

  ngOnInit() {
    this.seleccionSolucionForm = new ConsultaForm();
    this.seleccionForm = this.seleccionSolucionForm.getForm();
    this.utils.estadoTramite('2');
  }

  RealizarConsulta() {
    if (this.seleccionSolucionForm.isValid()) {
      this.mostrarResultados = !this.mostrarResultados;
      this.utils.estadoTramite('4');
    } else {
      this.invalidForm = true;
      return;
    }
  }
}
