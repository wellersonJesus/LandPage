import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false; // controla colapso do menu
  dropdownOpen = false; // controla dropdown
  innerWidth: number; // largura da tela

  constructor() {
    this.innerWidth = window.innerWidth; // captura largura inicial
  }

  // Atualiza largura da tela e ajusta menu
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth >= 992) {
      this.isCollapsed = false; // garante que menu esteja aberto no desktop
    }
  }

  // Alterna dropdown
  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

  // Controle de visibilidade do menu
  get isMenuVisible(): boolean {
    return this.isCollapsed || this.innerWidth >= 992;
  }

  // Ação do botão Business Sign-In
  goToDashboard(): void {
    console.log('Botão Business clicado');
    // Exemplo de redirecionamento: this.router.navigate(['/dashboard']);
  }
}
