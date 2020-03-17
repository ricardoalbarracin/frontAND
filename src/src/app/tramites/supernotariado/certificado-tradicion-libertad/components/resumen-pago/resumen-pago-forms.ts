import { FormBuilder, FormGroup} from "@angular/forms";

export class ResumenPagoForm {
    public resumenPagoForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.resumenPagoForm = this.formBuilder.group({
            infoUno: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum',
            infoDos: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum'  
          });
    }

    getForm(): FormGroup {
        return this.resumenPagoForm;
    }

    getFormValues() {
        return this.resumenPagoForm.value;
    }

}