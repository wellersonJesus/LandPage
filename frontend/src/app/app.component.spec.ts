import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  dropdownOpen = false;

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
    event.stopPropagation();
  }

  @HostListener('document:click')
  closeDropdownOutside() {
    this.dropdownOpen = false;
  }
}
