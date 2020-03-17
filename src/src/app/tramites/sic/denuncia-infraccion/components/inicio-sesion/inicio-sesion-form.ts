import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class InicioSesionForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.min(4), Validators.max(20),Validators.pattern('^[A-Za-z0-9]+$')]],
            password: ['', [Validators.required, Validators.min(4), Validators.max(32),Validators.pattern('^[A-Za-z0-9]+$')]]
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