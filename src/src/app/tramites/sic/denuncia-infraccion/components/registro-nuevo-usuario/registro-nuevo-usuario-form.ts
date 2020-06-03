import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class RegistroNuevoUsuarioForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipoPersona: [''],
            tipoDocumento: ['', Validators.required],
            numeroDocumento: ['', [Validators.required, Validators.minLength(4),
              Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
            correo: ['', [Validators.required, Validators.minLength(7),
              Validators.maxLength(100), Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
