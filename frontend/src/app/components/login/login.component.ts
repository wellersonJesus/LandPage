import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient) {}

  login(event: Event) {
    event.preventDefault();

    this.http.post(`${environment.API_BASE_URL_LOCAL}/login`, {
      email: this.email,
      senha: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('Usuário logado', res);
        this.error = '';
        // redirecionar ou salvar token
      },
      error: (err) => {
        console.error(err);
        this.error = 'Usuário ou senha inválidos.';
      }
    });
  }
}
