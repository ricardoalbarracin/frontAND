import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class AdjuntaDocumentoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            opcion: ['no'],
            denuncia: ['',  [Validators.required, Validators.minLength(20)]]
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
