import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class DatosDenuncianteApoderadoForm {
    public form: FormGroup;
    private formBuilder: any;

    constructor() {
        this.formBuilder = new FormBuilder();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
          tipo_documento: ['', Validators.required],
          numero_documento: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
          primer_nombre: ['', [Validators.required, Validators.min(2), Validators.max(25), Validators.pattern('^[A-Za-z]+$')]],
          segundo_nombre: [''],
          primer_apellido: ['', [Validators.required, Validators.min(2), Validators.max(25), Validators.pattern('^[A-Za-z]+$')]],
          segundo_apellido: [''],
          direccion: ['', Validators.required],
          telefono_fijo: ['', [Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          telefono_celular: ['', [Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          pais: ['', Validators.required],
          departamento: ['', Validators.required],
          ciudad: ['', Validators.required],
          correo: ['', [Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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
