import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ConsultaEstadoDenunciaForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            anyo: ['',Validators.required],
            numero_radicado: ['',[Validators.minLength(4), Validators.maxLength(10), Validators.required,Validators.pattern('^[0-9]+$')]],                    
            numero_documento: ['',[Validators.pattern('^[0-9]+$')]],
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