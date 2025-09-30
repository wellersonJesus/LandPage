// ------------------------------
// Importa credenciais
// ------------------------------
import { adminCredentials, firebaseConfig } from './keys.local.js'; // LOCAL
// Para produção, o CI deve gerar ./keys.js automaticamente

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ------------------------------
// Base URL dinâmica
// ------------------------------
const isGitLab = window.location.hostname.includes("gitlab.io");

// Nome do repositório (primeira pasta do path)
const pathParts = window.location.pathname.split("/").filter(Boolean);
const repoName = isGitLab && pathParts.length > 0 ? pathParts[0] : "";

// Base para redirecionamento
const baseURL = isGitLab ? `/${repoName}/pages/` : "./";

// ------------------------------
// Firebase
// ------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ------------------------------
// Utilitários
// ------------------------------
const showAlert = (msg, type='info') => alert(`${type==='success'?'✅':type==='error'?'❌':'ℹ️'} ${msg}`);
const setUserSession = (email) => {
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('userEmail', email);
};
const redirectToDashboard = () => window.location.href = `${baseURL}dashboard.html`;

// ------------------------------
// DOM
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleLoginBtn = document.getElementById('googleLogin');

  // Se já está logado → dashboard
  if(sessionStorage.getItem('loggedIn') === 'true') redirectToDashboard();

  // Login admin
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(!email || !password) return showAlert("Preencha todos os campos","error");

    if(email === adminCredentials.email && password === adminCredentials.password){
      setUserSession(email);
      showAlert("Login realizado com sucesso!","success");
      redirectToDashboard();
    } else showAlert("Email ou senha inválidos","error");
  });

  // Login Google
  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserSession(result.user.email);
      showAlert(`Bem-vindo, ${result.user.displayName}`,"success");
      redirectToDashboard();
    } catch(err){
      console.error(err);
      showAlert("Erro ao autenticar com Google","error");
    }
  });
});
