import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si está vacío', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('debería navegar si el login es exitoso', () => {
    authServiceSpy.login.and.returnValue(of(true));
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456',
    });
    component.onSubmit();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('debería mostrar error si el login falla', () => {
    authServiceSpy.login.and.returnValue(of(false));
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456',
    });
    component.onSubmit();
    expect(component.hasError()).toBeTrue();
  });
});
