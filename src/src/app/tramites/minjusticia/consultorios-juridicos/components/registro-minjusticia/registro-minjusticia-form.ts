import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";

export class RegistroMinjusticiaForm {
    public form: FormGroup;
    private formBuilder: any;
    private actionType = {
        Invalid: 0,
        Valid: 1
      };

    constructor() { 
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            primerNombre: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            segundoNombre: ['', Validators.max(50)],
            primerApellido: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50)])],
            segundoApellido: ['', Validators.max(50)],
            tipoDocumento: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(20)])],
            numeroDocumento: ['', Validators.compose([Validators.required])],
            email: ['',Validators.compose([Validators.required, Validators.min(1), Validators.max(50), Validators.email])],
            telefono: [''],
            departamento: ['', Validators.required],
            municipio: ['', Validators.required],
            direccion: ['', Validators.compose([Validators.required, Validators.max(50)]) ],
            estrato: ['', Validators.required],
            ingresos: ['', Validators.required],
            contrasena: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
            repContrasena: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
            recaptcha: [null, Validators.required]
        });

        this.form.setValidators(this.validatePassword());
    }

    validatePassword(): ValidatorFn {
        return (group: FormGroup): ValidationErrors => {
            
            const pass = group.controls["contrasena"];
            const passRepeat = group.controls["repContrasena"];

            if(pass.value.length > 0 && passRepeat.value.length > 0){
                if (pass.value == passRepeat.value){
                    pass.setErrors(null);
                    passRepeat.setErrors(null);
                    
                    this.callChangePasswordEvents(this.actionType.Valid);
                    return null;
                }
            }

            pass.setErrors({ 'incorrect': true });
            passRepeat.setErrors({ 'incorrect': true });

            this.callChangePasswordEvents(this.actionType.Invalid);

            return { matchingInputs: false }
        }
    }

    //Llama los eventos de "change" para que se vea reflejado el estado de los campos de contraseña
    callChangePasswordEvents(action: number) : void {        
        const container = document.getElementById("registroMinjusticiaDiv");

        this.changeElement(container.querySelector("#contrasena"), action);
        this.changeElement(container.querySelector("#repContrasena"), action);
    }

    changeElement(item: any, action: number): void {
        let event = new CustomEvent("change");
        item.dispatchEvent(event);

        if (action == 1){
            item.previousElementSibling.classList.remove("label-error");
        }
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