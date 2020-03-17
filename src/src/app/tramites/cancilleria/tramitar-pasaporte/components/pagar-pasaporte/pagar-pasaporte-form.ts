import { FormBuilder, FormGroup} from "@angular/forms";

export class PagarPasaporteForm {
    public pagoPasaporteForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.pagoPasaporteForm = this.formBuilder.group({
            nombresApellidos: 'Pepito Pérez',
            tipoPasaporte: 'ORDINARIO - 32 PÁGINAS',
            tipoDocumento: 'Cédula de ciudadania',
            solicitud: '2091209124',
            numeroDocumento: '1026272887',
            oficina: 'Bogotá',
            nacionalidad:'Colombia',
            totalPago: '160.000.',
            centavos:'00'   
          });
    }

    getForm(): FormGroup {
        return this.pagoPasaporteForm;
    }

    getFormValues() {
        return this.pagoPasaporteForm.value;
    }

}