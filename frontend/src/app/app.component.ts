import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: RouterOutlet precisa estar aqui
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  openLogin(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = false; // Fecha o dropdown ao navegar
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement): void {
    const clickedInside = target.closest('.dropdown-container');
    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }
}
