import { FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static validateEqualsInputs(field1: string, field2: string) {
    return (formGroup: FormGroup): null | Record<string, boolean> => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value ? null : { passwordNotEqual: true };
    };
  }

  static validField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors ?? {};
    return this.getErrorName(errors);
  }

  static getErrorName(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return '*Field required*';

        case 'email':
          return '*Invalid email*';

        case 'passwordNotEqual':
          return '*Passwords not match*';

        default:
          return 'Not controlled error';
      }
    }
    return null;
  }
}
