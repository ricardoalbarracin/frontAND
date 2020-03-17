import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class PagoPseForm {
    public pagoPseForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.pagoPseForm = this.formBuilder.group({
            infoPersonal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum',
            email: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50), Validators.email])]
          });
    }

    getForm(): FormGroup {
        return this.pagoPseForm;
    }

    getFormValues() {
        return this.pagoPseForm.value;
    }

}