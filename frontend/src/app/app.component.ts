import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen = false;
  innerWidth = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;

    if (this.innerWidth >= 992) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    const clickedInside = event.target.closest('.dropdown-trigger');

    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }
}
