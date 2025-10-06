// pages/login/login.js
const BASE_URL = window.BASE_URL;

import { setUserSession } from `${BASE_URL}services/storage.service.js`;
import { adminCredentials } from `${BASE_URL}app/keys.js`;

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleBtn = document.getElementById('googleLogin');
  const instagramBtn = document.getElementById('instagramLogin');

  // Redireciona se já estiver logado
  if (sessionStorage.getItem('loggedIn') === 'true') {
    window.location.href = `${BASE_URL}pages/dashboard/dashboard.html`;
  }

  // Login admin/local
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) return alert("❌ Preencha todos os campos");

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUserSession(email);
      alert("✅ Login realizado com sucesso!");
      window.location.href = `${BASE_URL}pages/dashboard/dashboard.html`;
    } else {
      alert("❌ Email ou senha inválidos");
    }
  });

  // Botão Google (import dinâmico)
  googleBtn?.addEventListener('click', async () => {
    try {
      const { signInWithGoogle } = await import(`${BASE_URL}services/firebase.service.js`);
      const user = await signInWithGoogle();
      setUserSession(user.email);
      alert(`✅ Bem-vindo, ${user.displayName || user.email}`);
      window.location.href = `${BASE_URL}pages/dashboard/dashboard.html`;
    } catch (err) {
      console.error(err);
      alert("❌ Falha no login Google");
    }
  });

  // Botão Instagram abre link externo
  instagramBtn?.addEventListener('click', () => {
    window.open('https://www.instagram.com/seu_perfil', '_blank');
  });
});
