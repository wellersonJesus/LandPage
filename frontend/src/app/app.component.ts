import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ws-manager';
  dropdownOpen = false;

  toggleDropdown(state?: boolean) {
    this.dropdownOpen = state !== undefined ? state : !this.dropdownOpen;
  }
}
