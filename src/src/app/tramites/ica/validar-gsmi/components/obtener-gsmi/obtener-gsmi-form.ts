import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class ObtenerGsmiForm {
  public form: FormGroup;
  private formBuilder: any;

  constructor() {
      this.formBuilder = new FormBuilder();
      this.buildForm();
  }

  buildForm() {
      this.form = this.formBuilder.group({
        digitosNumeroGsmi: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
        codigoValidador: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
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
