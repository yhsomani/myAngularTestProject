import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
  };
  message?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUri: string = 'http://localhost:4000/api/auth';
  private readonly tokenKey = 'auth_token';

  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUri}/register`, credentials)
      .pipe(catchError(this.handleError));
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUri}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token);
            this.authState.next(true);
            this.router.navigate(['/employee-list']);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}