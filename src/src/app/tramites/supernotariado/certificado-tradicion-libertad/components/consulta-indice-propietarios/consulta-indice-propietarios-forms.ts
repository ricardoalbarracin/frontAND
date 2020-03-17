import { FormBuilder, FormGroup, Validators } from "@angular/forms";


//Formulario para la consulta por chip o matrícula catastral.
export class ConsultaChipForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({            
            numeroMatricula:['', Validators.required]
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

//Formulario para la consulta por documento de identificación.
export class ConsultaDocumentoIdentificacionForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({            
            tipoDocumento: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])],
            numeroDocumento:['', Validators.required]
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

//Formulario para la consulta por nombres y apellidos.
export class ConsultaNombresApellidosForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({ 
            primerNombre: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            segundoNombre: ['',Validators.compose([Validators.min(0), Validators.max(50)])],
            primerApellido: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            segundoApellido: ['',Validators.compose([Validators.min(0), Validators.max(50)])]
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

//Formulario para la consulta por razón social.
export class ConsultaRazonSocialForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({ 
            razonSocial: ['',Validators.compose([Validators.required])]
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