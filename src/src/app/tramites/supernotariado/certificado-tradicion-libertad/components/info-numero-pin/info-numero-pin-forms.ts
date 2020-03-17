import { FormBuilder, FormGroup} from "@angular/forms";

export class InfoNumeroPinForm {
    public infoNumeroPinForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.infoNumeroPinForm = this.formBuilder.group({
            encabezado: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
            infoGeneral: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum'  
          });
    }

    getForm(): FormGroup {
        return this.infoNumeroPinForm;
    }

    getFormValues() {
        return this.infoNumeroPinForm.value;
    }

}