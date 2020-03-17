import { FormBuilder, FormGroup } from "@angular/forms";

export class EstadoSolicitudForm {
    public estadoSolicitudForm: FormGroup;
    private formBuilder: any;


    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        
    }

    getForm(): FormGroup {
        return this.estadoSolicitudForm;
    }

    getFormValues() {
        return this.estadoSolicitudForm.value;
    }
    

}