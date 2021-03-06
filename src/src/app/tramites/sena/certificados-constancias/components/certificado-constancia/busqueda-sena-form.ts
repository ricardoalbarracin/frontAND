import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class BusquedaSenaForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipoConsulta: [''],
            tipoDocumento: [''],
            documento: [''],
            registro: ['']

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
