import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class DatosPersonaNaturalForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipo_documento: ['', Validators.required],
            numero_documento: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
            primer_nombre: ['',    [Validators.required, Validators.min(2), Validators.max(25), Validators.pattern('^[A-Za-z]+$')]],
            segundo_nombre: [''],
            primer_apellido: ['',  [Validators.required, Validators.min(2), Validators.max(25), Validators.pattern('^[A-Za-z]+$')]],
            segundo_apellido: [''],
            calle_cra: [''],
            primer_valor_calle_cra: [''],
            segundo_valor_calle_cra: [''],
            tercer_valor_calle_cra: [''],
            informacion_complementaria: [''],
            informacion_complementaria2: [''],
            telefono_fijo: ['',[Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
            celular: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
            fax: ['',[Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
            pais: ['', Validators.required],
            departamento: ['', Validators.required],
            ciudad: ['', Validators.required],
            educacion: ['', Validators.required],
            genero: ['', Validators.required],
            fecha_nacimiento: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            etnico: [''],
            correo: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(100),
              Validators.email,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            calle_letra: [''],
            calle_bis: [''],
            calle_bis_letra: [''],
            calle_sufijo: [''],
            calle_letra_segundo: [''],
            calle_sufijo_tercer: [''],
            direccion_definitiva: [''],
            recaptcha: ['', Validators.required],
            selector: ['', Validators.required]
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
