import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { User } from '../model/user.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'Auth';
  private readonly tokenKey = 'auth_token';
  private token = signal<string | null>(this.getTokenFromStorage());

  isLoggedIn = computed(() => this.token() !== null);

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<string> {
    console.log(user);
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/${this.url}/Login`, user)
      .pipe(
        map((response) => {
          console.log(response);
          this.setToken(response.token);
          return response.token;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.clearToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.token.set(token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.token.set(null);
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
