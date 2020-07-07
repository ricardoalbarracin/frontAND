import { FormBuilder, FormGroup, Validators, FormArray,FormControl  } from "@angular/forms";

export class DireccionForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
          pais: ['',Validators.required],
          departamento: ['',Validators.required],
          municipio: ['',Validators.required],
          codigo_postal: [''],
          tipo_via: [''],
          numero_via_principal: [''],
          prefijo_cuadrante1: [''],
          bis: [''],
          orientacion1: [''],
          numero_via: [''],
          prefijo_cuadrante2: [''],
          numero_placa1: [''],
          numero_placa2: [''],
          orientacion2: [''],
          tipo_complemento: [''],
          descripcion_complemento: ['']
        });
    }
    
    getForm(): FormGroup {
        return this.form;
    }

    getFormValues() {
        return this.form.value;
    }

    isValid() {
        return this.form.valid;
    }

}
