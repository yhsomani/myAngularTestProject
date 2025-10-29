import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

// Import all models
import { Quiz } from '../Modules/Quize';
import { Employee } from '../Modules/Employee';
import { Technology } from '../Modules/Technology';
import { TechnologyTopic } from '../Modules/TechnologyTopic';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  // Inject AuthService
  constructor(private http: HttpClient, private authService: AuthService) { }

  // -------------------------------------------------
  // Employee Methods
  // -------------------------------------------------
  createEmployee(data: any): Observable<any> {
    let url = `${this.baseUri}/employees`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt.bind(this)));
  }
  getEmployees() {
    return this.http
      .get(`${this.baseUri}/employees`)
      .pipe(catchError(this.errorMgmt.bind(this)));
  }
  getEmployee(id: string): Observable<any> {
    let url = `${this.baseUri}/employees/${id}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorMgmt.bind(this))
    );
  }
  updateEmployee(id: string, data: any): Observable<any> {
    let url = `${this.baseUri}/employees/${id}`;
    return this.http
      .put(url, data)
      .pipe(catchError(this.errorMgmt.bind(this)));
  }
  deleteEmployee(id: string): Observable<any> {
    let url = `${this.baseUri}/employees/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.errorMgmt.bind(this)));
  }

  // -------------------------------------------------
  // Simple Quiz Method
  // -------------------------------------------------
  getQuizes(): Observable<Quiz[]> {
    let url = `${this.baseUri}/quize`;
    return this.http.get<Quiz[]>(url).pipe(catchError(this.errorMgmt.bind(this)));
  }

  // -------------------------------------------------
  // Technology Quiz Methods
  // -------------------------------------------------
  getTechnologies(): Observable<Technology[]> {
    let url = `${this.baseUri}/technologies`;
    return this.http.get<Technology[]>(url).pipe(catchError(this.errorMgmt.bind(this)));
  }
  getQuestionsFor(techName: string): Observable<TechnologyTopic> {
    let url = `${this.baseUri}/technologies/${techName}`;
    return this.http.get<TechnologyTopic>(url).pipe(catchError(this.errorMgmt.bind(this)));
  }

  // -------------------------------------------------
  // Error handling
  // -------------------------------------------------
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      // Check for authentication errors (401)
      if (error.status === 401) {
        this.authService.logout();
      }
    }

    console.log(errorMessage);
    return throwError(() => error);
  }
}