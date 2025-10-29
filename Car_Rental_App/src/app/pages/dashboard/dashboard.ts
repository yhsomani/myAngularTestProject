import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { CarRentalService } from '../../services/car-rental.service';
import { Booking, Customer, DashboardData } from '../../model/api.types';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  carRentalService = inject(CarRentalService);

  // --- State Signals ---
  dashboardData = signal<DashboardData | null>(null);
  allBookings = signal<Booking[]>([]);
  allCustomers = signal<Customer[]>([]);
  recentBookings = signal<Booking[]>([]); // Derived from allBookings
  topCustomers = signal<Customer[]>([]); // Derived from allCustomers

  isLoading = signal(true);
  errorMessage = signal('');
  notification = signal<{ type: 'success' | 'error'; message: string } | null>(null);
  today: Date = new Date();

  ngOnInit() {
    this.loadAllDashboardData();
  }

  loadAllDashboardData() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      bookings: this.carRentalService
        .getAllBookings()
        .pipe(catchError(() => of([] as Booking[]))),
      customers: this.carRentalService
        .getCustomers()
        .pipe(catchError(() => of([] as Customer[]))),
    }).subscribe({
      next: ({ bookings, customers }) => {
        // Calculate dashboard data from bookings and customers
        const today = new Date();
        const todaysBookings = bookings.filter(b => {
          const bookingDate = new Date(b.bookingDate);
          return bookingDate.getFullYear() === today.getFullYear() &&
                 bookingDate.getMonth() === today.getMonth() &&
                 bookingDate.getDate() === today.getDate();
        });

        const todayTotalAmount = todaysBookings.reduce((sum, b) => sum + b.totalBillAmount, 0);

        this.dashboardData.set({
          todayTotalAmount: todayTotalAmount,
          totalBookings: bookings.length,
          totalCustomers: customers.length,
        });

        // Set All Bookings and Customers
        this.allBookings.set(bookings);
        this.allCustomers.set(customers);

        // Derive Recent Bookings
        this.recentBookings.set(
          bookings
            .sort(
              (a, b) =>
                new Date(b.bookingDate).getTime() -
                new Date(a.bookingDate).getTime()
            )
            .slice(0, 5)
        );

        // Derive Top Customers (e.g., first 6)
        this.topCustomers.set(customers.slice(0, 6));

        this.isLoading.set(false);
      },
      error: (err) => {
        // This will run if forkJoin itself has an issue (which is unlikely with catchError)
        console.error('Critical dashboard load error:', err);
        this.isLoading.set(false);
        this.errorMessage.set(
          'A critical error occurred. Unable to load dashboard.'
        );
      },
    });
  }
}