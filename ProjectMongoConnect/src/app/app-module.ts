// Import Core Angular modules
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- Import interceptor token

// Import Routing
import { AppRoutingModule } from './app-routing-module';

// Import Services
import { AuthService } from './Services/auth-service';
import { AuthInterceptor } from './interceptors/auth-interceptor';

// Import Components
import { App } from './app';
import { EmployeeCreate } from './Components/employee-create/employee-create';
import { EmployeeEdit } from './Components/employee-edit/employee-edit';
import { EmployeeList } from './Components/employee-list/employee-list';
import { QuizDisplay } from './Components/quiz-display/quiz-display';
import { TechQuiz } from './Components/tech-quiz/tech-quiz';
import { Register } from './register/register'; // <-- Import standalone component
import { Login } from './login/login'; // <-- Import standalone component

@NgModule({
  declarations: [
    App,
    EmployeeCreate,
    EmployeeEdit,
    EmployeeList,
    QuizDisplay,
    TechQuiz,
    // Login and Register are standalone, so they are not declared
  ],
  imports: [
    // These modules provide all the missing features
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Login, // <-- Import standalone component
    Register, // <-- Import standalone component
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(), // <-- This provides HttpClient
    // AuthService, // <-- REMOVED from here (already providedIn: 'root')
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, // <-- Add Interceptor
  ],
  bootstrap: [App],
})
export class AppModule {}

