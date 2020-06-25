import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DatosRemitenteForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }
//
    buildForm() {
        this.form = this.formBuilder.group({
          tipo_persona: ['',[Validators.required]],
          tipo_documento: ['',[Validators.required]],
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
