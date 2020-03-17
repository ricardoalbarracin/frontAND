import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class BuscarAntecedentesForm {
    public form: FormGroup;
    private formBuilder: any;ObtenerTiposDocumentos

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipoDocumento: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            documento: ['', Validators.compose([Validators.required])],
            recaptcha: [ null, Validators.required]
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