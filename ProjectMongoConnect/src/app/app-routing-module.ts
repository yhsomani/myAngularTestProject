import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // <-- Missing import

// Import components for routing
import { EmployeeCreate } from './Components/employee-create/employee-create';
import { EmployeeList } from './Components/employee-list/employee-list';
import { EmployeeEdit } from './Components/employee-edit/employee-edit';
import { QuizDisplay } from './Components/quiz-display/quiz-display';
import { TechQuiz } from './Components/tech-quiz/tech-quiz';
import { Login } from './login/login';
import { Register } from './register/register';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  // Auth routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // App routes
  {
    path: 'employees-list',
    component: EmployeeList,
    canActivate: [AuthGuard], // <-- Protect route
  },
  {
    path: 'create-employee',
    component: EmployeeCreate,
    canActivate: [AuthGuard], // <-- Protect route
  },
  {
    path: 'edit-employee/:id',
    component: EmployeeEdit,
    canActivate: [AuthGuard], // <-- Protect route
  },
  {
    path: 'quiz',
    component: QuizDisplay,
    canActivate: [AuthGuard], // <-- Protect route
  },
  {
    path: 'tech-quiz',
    component: TechQuiz,
    canActivate: [AuthGuard], // <-- Protect route
  },

  // Redirects
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // Optional: redirect all other routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // <-- This provides router-outlet
  exports: [RouterModule], // <-- This provides routerLink
})
export class AppRoutingModule { }
