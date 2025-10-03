// src/pages/dashboard/dashboard.js
import { getUserSession, clearUserSession } from '../../services/storage.service.js';

document.addEventListener('DOMContentLoaded', () => {
  const userEmailElem = document.getElementById('userEmail');
  const logoutBtn = document.getElementById('logoutBtn');

  // Mostra o e-mail do usuário
  const userEmail = getUserSession();
  if (!userEmail) {
    redirectToLogin();
    return;
  }
  if (userEmailElem) userEmailElem.innerText = userEmail;

  // Logout
  logoutBtn?.addEventListener('click', () => {
    clearUserSession();
    redirectToLogin();
  });

  // Função para redirecionar ao login
  function redirectToLogin() {
    const isGitLab = window.location.hostname.includes('gitlab.io');
    const repoName = 'ws-gestao';
    const baseURL = isGitLab ? `/${repoName}/` : '../../';
    window.location.href = `${baseURL}pages/login/login.html`;
  }
});
