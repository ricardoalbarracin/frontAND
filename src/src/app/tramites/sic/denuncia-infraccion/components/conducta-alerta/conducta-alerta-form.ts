import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ConductaAlertaForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            opcion: ['585', Validators.required],
            denuncia: ['',  [Validators.required, Validators.minLength(150)]]
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
