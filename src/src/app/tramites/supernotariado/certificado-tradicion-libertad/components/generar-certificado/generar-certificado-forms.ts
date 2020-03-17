import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class GenerarCertificadoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({               
            oficinaRegistro:['', Validators.required],
            //indexMatricula: [''],
            //numeroMatricula: [''],            
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
