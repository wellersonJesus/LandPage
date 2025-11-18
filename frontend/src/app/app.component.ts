import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen = false;

  // Alterna entre hambúrguer e X
  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Evita que cliques no documento fechem o dropdown
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Fecha o dropdown ao clicar fora
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }
}
