import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class SolicitarPasaporteForm {
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
            fechaExpedicion: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            email: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50), Validators.email])],
            confirmacionEmail: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50), Validators.email])],
            numeroPasaporte:['', Validators.required],
            fechaExpedicionPasaporte: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
            digitoVerificacion: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
            tipoPasaporte:['', Validators.required],
            motivoSolicitud:['',Validators.required],
            oficinaSolicitud:['', Validators.required],
            recaptcha: ['', Validators.required],
            checkDatos: ['', Validators.required]
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