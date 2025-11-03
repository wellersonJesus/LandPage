import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dropdownOpen: boolean = false;
  innerWidth: number = window.innerWidth;
  private hoverTimeout: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth >= 992) {
      this.dropdownOpen = false;
    }
  }

  // Abre dropdown com delay ao hover (desktop)
  openDropdown() {
    clearTimeout(this.hoverTimeout);
    if (this.innerWidth >= 992) {
      this.dropdownOpen = true;
    }
  }

  // Fecha dropdown com delay para dar tempo de clicar nas opções
  closeDropdown() {
    if (this.innerWidth >= 992) {
      this.hoverTimeout = setTimeout(() => {
        this.dropdownOpen = false;
      }, 400); // 400ms de atraso antes de fechar
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
