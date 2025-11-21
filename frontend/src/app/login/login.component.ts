import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  dropdownOpen = false;

  constructor(private http: HttpClient, private router: Router) {}

  toggleDropdown(ev?: Event) {
    if (ev) ev.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  openLoginModal(ev?: Event) {
    if (ev) ev.preventDefault();
    const el = document.getElementById('loginModal');
    if (!el) return;
    const modal = new (window as any).bootstrap.Modal(el);
    modal.show();
  }

  submit(ev?: Event) {
    if (ev) ev.preventDefault();
    this.error = '';
    this.http.post<any>('/api/login.php', { username: this.username, password: this.password })
      .subscribe({
        next: res => {
          if (res?.token) {
            localStorage.setItem('ws_token', res.token);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.error = 'Resposta inválida do servidor';
          }
        },
        error: err => {
          this.error = err?.error?.message || 'Credenciais inválidas';
        }
      });
  }
}