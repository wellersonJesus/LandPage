import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  dropdownOpen = false;

  // 🔹 Alterna o dropdown ao clicar ou tocar
  toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  // 🔹 Abre o dropdown ao passar o mouse (apenas desktop)
  openDropdown() {
    if (window.innerWidth > 992) {
      this.dropdownOpen = true;
    }
  }

  // 🔹 Fecha o dropdown ao sair do hover (apenas desktop)
  closeDropdown() {
    if (window.innerWidth > 992) {
      this.dropdownOpen = false;
    }
  }

  // 🔹 Fecha dropdown ao clicar/tocar fora dele
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    // fecha apenas se clicar fora da área do dropdown
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }
}
