import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h2>Dashboard</h2>
      <p>Bem-vindo(a), você está logado.</p>
      <button class="btn btn-secondary" (click)="logout()">Sair</button>
    </div>
  `
})
export class DashboardComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('ws_token');
    this.router.navigateByUrl('/login');
  }
}