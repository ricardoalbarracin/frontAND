import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import appJson from '@stringResources/app-strings.json';

export class SolicitarCertificadoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            primerNombre: ['', Validators.required],
            segundoNombre: [''],
            primerApellido: ['', Validators.required],
            segundoApellido: [''],
            tipoDocumento: ['', Validators.required],
            numeroIdentificacion: ['', Validators.compose([Validators.required, , Validators.pattern(appJson.regexp.numeric)])],
            correoElectronico: ['', Validators.compose([Validators.email, Validators.required])],
            tipoEntidadDestino: ['', Validators.required],
            paisDestino: ['', Validators.required],
            recaptcha: ['', Validators.required]
        });
    }

    getForm(): FormGroup {
        return this.form;
    }

    getFormValues() {
        return this.form.value;
    }

    resetForm() {
        this.form.reset();
    }

    isValid() {
        return this.form.valid;
    }

}