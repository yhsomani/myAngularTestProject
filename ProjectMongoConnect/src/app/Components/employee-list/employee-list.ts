import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api-service';
import { Employee } from '../../Modules/Employee';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.error = null;

    this.apiService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load employees';
        this.loading = false;

        if (error.status === 401) {
          this.authService.logout();
        }
      }
    });
  }

  removeEmployee(employee: Employee, index: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.apiService.deleteEmployee(employee._id).subscribe({
        next: () => {
          this.employees.splice(index, 1);
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete employee';

          if (error.status === 401) {
            this.authService.logout();
          }
        }
      });
    }
  }
}
