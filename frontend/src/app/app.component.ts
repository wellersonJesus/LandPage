import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed: boolean = false;       // Mobile menu toggle
  dropdownOpen: boolean = false;      // Dropdown toggle
  innerWidth: number = window.innerWidth;

  // Detecta resize da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth >= 992) {
      this.isCollapsed = false;       // Menu sempre aberto no desktop
      this.dropdownOpen = false;      // Reset dropdown
    }
  }

  // Mobile menu toggle
  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Dropdown hover desktop
  openDropdown() {
    if (this.innerWidth >= 992) {
      this.dropdownOpen = true;
    }
  }

  closeDropdown() {
    if (this.innerWidth >= 992) {
      this.dropdownOpen = false;
    }
  }

  // Dropdown click mobile
  toggleDropdown(event: MouseEvent) {
    if (this.innerWidth < 992) {
      event.preventDefault();
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
}
