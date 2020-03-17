import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ConsultaATCForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            descripcion: ['sustancia',Validators.required],
            sustancia: [{value: '', disabled: true},Validators.required],
            categoria: [''],
            sistemaOrganico: ['', Validators.required],
            grupoFarmacologico: ['', Validators.required],
            subGrupoQuimico: ['', Validators.required],
            categoriaSustancia: ['', Validators.required],
            subGrupoFarmacologico: ['', Validators.required],
            localizarSustancia:[''],
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
