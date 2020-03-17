import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ValidacionCertificadoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            pinCertificado: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],            
            recaptcha: ['', Validators.required]
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
