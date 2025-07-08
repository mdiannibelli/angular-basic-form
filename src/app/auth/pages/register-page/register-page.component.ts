import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      subjects: this.fb.array(
        [
          ['Maths', Validators.required],
          ['English', Validators.required],
        ],
        Validators.minLength(3)
      ),
    },
    {
      validators: [
        this.formUtils.validateEqualsInputs('password', 'confirmPassword'),
      ],
    }
  );

  subjectForm = new FormControl('', Validators.required);

  onAddSubject() {
    if (this.subjectForm.invalid) return;

    const newSubject = this.subjectForm.value;
    const currentSubjects = this.registerForm.get('subjects') as FormArray;
    currentSubjects.push(new FormControl(newSubject, Validators.required));

    this.subjectForm.reset();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
  }
}
