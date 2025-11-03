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
  private hoverTimeout: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth >= 992) {
      this.isCollapsed = false;
      this.dropdownOpen = false;
    }
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Abre ao hover (desktop) com leve delay para facilitar seleção
  openDropdown() {
    clearTimeout(this.hoverTimeout);
    if (this.innerWidth >= 992) {
      this.dropdownOpen = true;
    }
  }

  // Fecha ao sair com leve delay
  closeDropdown() {
    if (this.innerWidth >= 992) {
      this.hoverTimeout = setTimeout(() => {
        this.dropdownOpen = false;
      }, 300); // 300ms de atraso antes de fechar
    }
  }

  // Alterna no clique (mobile)
  toggleDropdown(event: MouseEvent) {
    if (this.innerWidth < 992) {
      event.preventDefault();
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
}
