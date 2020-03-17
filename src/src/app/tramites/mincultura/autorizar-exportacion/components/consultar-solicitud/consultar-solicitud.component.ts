import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-solicitud',
  templateUrl: './consultar-solicitud.component.html',
  styleUrls: ['./consultar-solicitud.component.scss']
})
export class ConsultarSolicitudComponent implements OnInit {

  estado:any;
  myClassesImg:any;
  registerForm: FormGroup;
  submitted = false;

  constructor(public formBuilder: FormBuilder, public service: AutorizarExportacionUtilService) {
    this.estado='text-success';

    this.myClassesImg = 'text-success material-icons';

   }

   consultar(){
    this.asignarVariables();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.service.asignarLlega(9);
        this.service.asignarFormularioInvalido(true);
        return;
    }

     this.service.asignarConsultar(true);
   }

   asignarVariables(){
    this.submitted = true;
    this.service.asignarFormularioInvalido(false);
  }

   verConcepto(){
    var boolconsultarVerConcepto = !this.service.consultarVerConcepto?true:false;
    this.service.asignarConsultarVerConcepto(boolconsultarVerConcepto);

      if(this.service.consultarVerConcepto===false){
        this.service.asignarConsultarVerDescargar(false);
      }
  }

  verDescargar(){

      var boolconsultarVerDescargar = !this.service.consultarVerDescargar?true:false
      this.service.asignarConsultarVerDescargar(boolconsultarVerDescargar);
  }

  limpiar(){
    this.submitted=false;
    this.service.limpiarConsultar();
    this.registerForm.get('radicado').setValue(null);
    this.registerForm.get('numeroIdentificacion').setValue(null);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        
      radicado: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required]

     });
  }

  get f() { return this.registerForm.controls; }

}
