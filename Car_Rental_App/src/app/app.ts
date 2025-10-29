import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Set component to standalone
  imports: [RouterOutlet], // Import dependencies
  template: `
    <!-- The entire app's routing is handled here -->
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, // Improve performance
})
export class AppComponent {
  // The title signal was unused, so it's removed for cleanup.
}
