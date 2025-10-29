import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown(open: boolean) {
    this.dropdownOpen = open;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
