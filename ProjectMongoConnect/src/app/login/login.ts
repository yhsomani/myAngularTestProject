import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Adjust path as needed
import { AuthService } from '../Services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true, // <-- Mark as standalone
  imports: [
    CommonModule, // <-- Import for @if
    ReactiveFormsModule, // <-- Import for [formGroup]
    RouterModule, // <-- Import for routerLink
  ],
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          // This line was corrupted, here is the fix:
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    // Check form validity
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return false;
    }

    // Show loading state or disable form
    const credentials = this.loginForm.value;
    const formControls = this.loginForm.controls;
    Object.keys(formControls).forEach(key => formControls[key].disable());

    return this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('User successfully logged in!');
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else if (error.status === 0) {
          this.errorMessage = 'Server is not responding. Please try again later.';
        } else {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
        // Re-enable form controls
        Object.keys(formControls).forEach(key => formControls[key].enable());
      },
      complete: () => {
        // Re-enable form controls if needed
        if (this.errorMessage) {
          Object.keys(formControls).forEach(key => formControls[key].enable());
        }
      }
    });
  }
}
