import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ObtenerRsppForm {
  public form: FormGroup;
  private formBuilder: any;

  constructor() {
      this.formBuilder = new FormBuilder();
      this.buildForm();
  }

  buildForm() {
      this.form = this.formBuilder.group({
        numeroDocumento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern('^[0-9]+$')]],
        numeroRegistroIca: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
        codigoDepartamento: ['', Validators.required],
        codigoMunicipio: ['', Validators.required],
        recaptcha: [ null, Validators.required],
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
