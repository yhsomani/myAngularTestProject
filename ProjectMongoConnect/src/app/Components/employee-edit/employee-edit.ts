import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Services/api-service';

@Component({
  selector: 'app-employee-edit',
  standalone: false,
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  employeeId: string = '';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private actRoute: ActivatedRoute
  ) {
    this.mainForm();
    // Get the ID from the URL
    this.employeeId = this.actRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    // Fetch the employee data
    this.apiService.getEmployee(this.employeeId).subscribe(data => {
      // Pre-fill the form with the employee's data
      this.editForm.setValue({
        name: data.name,
        email: data.email,
        designation: data.designation,
        phoneNumber: data.phoneNumber,
      });
    });
  }

  mainForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0.9._%+-]+@[a-z0.9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e: any) {
    this.editForm.get('designation')!.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  // Handle the form submission
  onUpdate() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      // **FIX:** Removed `window.confirm()` as it blocks execution in sandboxed environments.
      // The update will now happen immediately.
      return this.apiService.updateEmployee(this.employeeId, this.editForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully updated!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e: any) => {
          console.log(e);
        },
      });
    }
  }
}
