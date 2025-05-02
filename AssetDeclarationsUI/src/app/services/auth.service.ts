import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { User } from '../model/user.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

const CLAIM_KEYS = {
  name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
} as const;

interface TokenPayload extends JwtPayload {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'Auth';
  private readonly tokenKey = 'auth_token';

  private token = signal<string | null>(localStorage.getItem(this.tokenKey));
  private decodedToken = computed<TokenPayload | null>(() => {
    if (!this.token()) return null;
    else return this.decodeToken(this.token()!);
  });

  userName = computed<string | undefined>(() => {
    return this.decodedToken()?.[CLAIM_KEYS.name] ?? undefined;
  });

  isLoggedIn = computed<boolean>(() => {
    return this.decodedToken() !== null;
  });

  isAdminLoggedIn = computed<boolean>(() => {
    return this.decodedToken()?.[CLAIM_KEYS.role] === 'ADMIN';
  });

  constructor(private httpClient: HttpClient) {}

  login(user: User): Observable<string> {
    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}/${this.url}/Login`, user)
      .pipe(
        map((response) => {
          this.saveToken(response.token);
          if (!this.userName()) {
            throw new Error('Failed to decode JWT');
          } else {
            return this.userName()!;
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.clearToken();
  }

  private saveToken(token: string): void {
    this.token.set(token);
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    this.token.set(null);
    localStorage.removeItem(this.tokenKey);
  }

  private decodeToken(token: string): TokenPayload | null {
    try {
      return jwtDecode<TokenPayload>(token);
    } catch (Error) {
      return null;
    }
  }
}
