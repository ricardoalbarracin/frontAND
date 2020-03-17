import { FormBuilder, FormGroup} from "@angular/forms";

export class InfoMatriculaForm {
    public infoMatriculaForm: FormGroup;
    private formBuilder: any;
    

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.infoMatriculaForm = this.formBuilder.group({
            encabezado: 'A continuación se muestra la información encontrada para la matricula ...'            
          });
    }

    getForm(): FormGroup {
        return this.infoMatriculaForm;
    }

    getFormValues() {
        return this.infoMatriculaForm.value;
    }

}