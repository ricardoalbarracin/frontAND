import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class DocumentostramiteForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }
//
    buildForm() {
        this.form = this.formBuilder.group({
          recaptcha: [''],
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
