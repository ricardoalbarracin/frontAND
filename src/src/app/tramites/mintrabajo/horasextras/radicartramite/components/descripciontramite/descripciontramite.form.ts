import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DescripciontramiteForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
          circunstancia: ['',[Validators.minLength(15), Validators.maxLength(500)]],
          direccion_territorial: ['',[Validators.required]],
          numero_radicado: [''],
          convenciones_colectivas: [''],
          reglamento_trabajo: [''],
          organizaciones_sindicales: ['']
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
