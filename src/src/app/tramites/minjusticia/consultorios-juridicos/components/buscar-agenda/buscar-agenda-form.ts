import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class BuscarAgendaForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            ciudad: ['', Validators.required],
            fecha: ['', Validators.required]
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