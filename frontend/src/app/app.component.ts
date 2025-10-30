import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen = false;

  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

  goToDashboard() {
    alert('Redirecionando para o Dashboard...');
  }
}
