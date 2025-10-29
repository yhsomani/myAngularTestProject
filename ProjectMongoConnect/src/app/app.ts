import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css', // <-- You were missing this
})
export class App {
  protected readonly title = signal('ProjectMongoConnect');
  public isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.authState$;
  }

  logout() {
    this.authService.logout();
  }
}
