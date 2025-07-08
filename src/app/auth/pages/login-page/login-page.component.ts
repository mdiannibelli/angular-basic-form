import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  resource,
  signal,
  ViewChild,
  viewChild,
  viewChildren,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../utils/form-utils';
import { AuthService } from '../../services/auth.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'login-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent /* implements AfterViewInit */ {
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  /* @ViewChild('txtHello') txtHello!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    console.log(this.txtHello.nativeElement.value);
  } */

  authService = inject(AuthService);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /* loginResource = resource({
    loader: async () => {
      const { email = '', password = '' } = this.loginForm.value;
      return await firstValueFrom(this.authService.login(email!, password!));
    },
  }); */

  /* private triggerLogin = signal<null | number>(null);
  loginResource = rxResource({
    defaultValue: false,
    params: () => this.triggerLogin(),
    stream: () => {
      const { email = '', password = '' } = this.loginForm.value;
      return this.authService.login(email!, password!);
    },
  }); */

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    /* this.loginResource.reload(); */
    const { email = '', password = '' } = this.loginForm.value;
    /* this.triggerLogin.update((v) => (v === null ? 0 : v + 1)); */

    this.authService.login(email!, password!).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }
}
