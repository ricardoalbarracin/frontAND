import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ConsultarEstadoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipoDocumento: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])],            
            numeroDocumento:['', Validators.required],
            numeroSolicitud:['', Validators.required],
            recaptcha: ['', Validators.required],           
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