import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interface/user.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interface/auth-response';

type AuthStats = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private _authStatus = signal<AuthStats>('checking');
  private _accessToken = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);
  private _user = signal<User | null>(null);

  authStatus = computed<AuthStats>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  accessToken = computed<string | null>(() => this._accessToken());
  refreshToken = computed<string | null>(() => this._refreshToken());
  user = computed<User | null>(() => this._user());

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          this._authStatus.set('authenticated');
          this._user.set(resp.user);
          this._accessToken.set(resp.accessToken);
          this._refreshToken.set(resp.refreshToken);
        }),
        map(() => true),
        catchError((err) => {
          // Transforma el error en una instancia de Error
          const customError = new Error(
            err?.error?.message || err?.message || 'Error desconocido'
          );
          // Puedes adjuntar el error original si quieres
          (customError as any).cause = err;
          return of(false);
          return throwError(() => customError);
        })
      );
  }
}
