import { adminCredentials } from '../../app/keys.js';
import { signInWithGoogle } from '../../services/firebase.service.js';
import { setUserSession } from '../../services/storage.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleBtn = document.getElementById('googleLogin');
  const instagramBtn = document.getElementById('instagramLogin');

  // 🔹 Redireciona se já estiver logado
  if (sessionStorage.getItem('loggedIn') === 'true') {
    window.location.href = '../dashboard/dashboard.html';
  }

  // 🔹 Login admin (local)
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      return alert("❌ Preencha todos os campos");
    }

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUserSession(email);
      alert("✅ Login realizado com sucesso!");
      window.location.href = '../dashboard/dashboard.html';
    } else {
      alert("❌ Email ou senha inválidos");
    }
  });

  // 🔹 Login Google (simulado / local)
  googleBtn?.addEventListener('click', async () => {
    try {
      const user = await signInWithGoogle();
      setUserSession(user.email);
      alert(`✅ Bem-vindo, ${user.email}`);
      window.location.href = '../dashboard/dashboard.html';
    } catch (err) {
      console.error(err);
      alert("❌ Falha no login Google");
    }
  });

  // 🔹 Botão Instagram abre link externo
  instagramBtn?.addEventListener('click', () => {
    window.open('https://www.instagram.com/seu_perfil', '_blank');
  });

  // 🔹 Observação sobre OAuth real GitLab
  // Se futuramente quiser integrar OAuth real:
  // const gitlabClientId = 'SEU_CLIENT_ID';
  // const redirectUri = 'https://projects.gitlab.io/auth';
  // const state = Math.random().toString(36).substring(2);
  // const scope = 'api';
  // const oauthUrl = `https://gitlab.com/oauth/authorize?client_id=${gitlabClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state}`;
  // window.location.href = oauthUrl;
});
