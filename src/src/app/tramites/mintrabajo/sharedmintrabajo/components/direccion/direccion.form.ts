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
          codigo_postal: ['',Validators.required],
          tipo_via: ['',Validators.required],
          numero_via_principal: ['',Validators.required],
          prefijo_cuadrante1: ['',Validators.required],
          bis: ['',Validators.required],
          orientacion1: ['',Validators.required],
          numero_via: ['',Validators.required],
          prefijo_cuadrante2: ['',Validators.required],
          numero_placa1: ['',Validators.required],
          numero_placa2: ['',Validators.required],
          orientacion2: ['',Validators.required],
          complementos: this.formBuilder.array([])
        });
    }

    get complementos(): FormArray {
      return this.form.get('complementos') as FormArray;
    }

    addComplemento() {
      const trabajo = this.formBuilder.group({
        tipo_complemento: new FormControl(''),
        descripcion_complemento: new FormControl('')
      });

      this.complementos.push(trabajo);
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
