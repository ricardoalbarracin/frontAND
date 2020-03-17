import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ObtenerCopiaForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
          tipoDocumento: ['', Validators.required],
          numeroDocumento: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]],
          recaptcha: [ null, Validators.required],
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
