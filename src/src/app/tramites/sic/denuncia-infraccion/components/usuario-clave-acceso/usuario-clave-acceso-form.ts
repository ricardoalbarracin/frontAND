import { FormBuilder, FormGroup,Validators } from "@angular/forms";

export class UsuarioClaveAccesoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.min(4), Validators.max(20),Validators.pattern('^[A-Za-z0-9]+$')]],
            paasword: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern('^[A-Za-z0-9]+$')]],
            repetir_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32),Validators.pattern('^[A-Za-z0-9]+$')]],
            recaptcha: ['', Validators.required],
            selector: ['', Validators.required]
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