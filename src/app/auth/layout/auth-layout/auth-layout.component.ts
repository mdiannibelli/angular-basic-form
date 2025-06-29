import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from '../../components/auth-navbar/auth-navbar.component';
import { AuthFooterComponent } from '../../components/auth-footer/auth-footer.component';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet, AuthNavbarComponent, AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
