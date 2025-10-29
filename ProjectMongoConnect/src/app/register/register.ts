import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Adjust path as needed
import { AuthService } from '../Services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true, // <-- Mark as standalone
  imports: [
    CommonModule, // <-- Import for @if
    ReactiveFormsModule, // <-- Import for [formGroup]
    RouterModule, // <-- Import for routerLink
  ],
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (!this.registerForm.valid) {
      return false;
    } else {
      return this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('User successfully registered!');
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e: any) => {
          console.log(e);
          this.errorMessage = e.error?.msg || 'Registration failed. Please try again.';
        },
      });
    }
  }
}
