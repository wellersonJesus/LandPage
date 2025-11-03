import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed: boolean = false;
  dropdownOpen: boolean = false;
  innerWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth >= 992) {
      this.isCollapsed = false; // menu sempre aberto no desktop
      this.dropdownOpen = false; // reset dropdown no resize
    }
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  openDropdown() {
    if (this.innerWidth >= 992) {
      this.dropdownOpen = true; // hover desktop
    }
  }

  closeDropdown() {
    if (this.innerWidth >= 992) {
      this.dropdownOpen = false; // hover desktop
    }
  }

  toggleDropdown() {
    if (this.innerWidth < 992) {
      this.dropdownOpen = !this.dropdownOpen; // click mobile
    }
  }
}
