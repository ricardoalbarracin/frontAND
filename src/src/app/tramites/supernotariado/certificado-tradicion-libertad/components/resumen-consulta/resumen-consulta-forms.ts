import { FormBuilder, FormGroup} from "@angular/forms";

export class ResumenConsultaForm {
    public resumenConsultaForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.resumenConsultaForm = this.formBuilder.group({
            encabezado: 'A continuación se muestra la información encontrada para la matricula',
            cuerpo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum'  
          });
    }

    getForm(): FormGroup {
        return this.resumenConsultaForm;
    }

    getFormValues() {
        return this.resumenConsultaForm.value;
    }

}