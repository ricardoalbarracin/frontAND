import { FormBuilder, FormGroup} from "@angular/forms";

export class CertificadoNoPropiedadForm {
    public certificadoNoPropiedadForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.certificadoNoPropiedadForm = this.formBuilder.group({
            encabezado: 'A continuación se muestra la información encontrada para la matricula',
            infoGeneral: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra. Leo duis ut diam quam nulla porttitor massa. Arcu dictum'            
          });
    }

    getForm(): FormGroup {
        return this.certificadoNoPropiedadForm;
    }

    getFormValues() {
        return this.certificadoNoPropiedadForm.value;
    }

}