import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Credenciais injetadas
const adminCredentials = window.adminCredentials;
const firebaseConfig = window.firebaseConfig;

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Funções utilitárias
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showAlert = (message, type = 'info') => {
  alert(`${type==='success'?'✅':type==='error'?'❌':'ℹ️'} ${message}`);
};

const setUserSession = email => sessionStorage.setItem('userEmail', email);
const redirectToDashboard = () => {
  if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    window.location.href = "http://127.0.0.1:8080/pages/dashboard.html";
  } else {
    window.location.href = `${window.location.origin}/ws-gestao/pages/dashboard.html`;
  }
};

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleLoginBtn = document.getElementById('googleLogin');

  // Login admin
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) { showAlert("Preencha todos os campos", "error"); return; }
    if (!isValidEmail(email)) { showAlert("Email inválido", "error"); return; }

    if (email===adminCredentials.email && password===adminCredentials.password) {
      setUserSession(email);
      showAlert("Login realizado com sucesso!", "success");
      redirectToDashboard();
    } else showAlert("Email ou senha inválidos", "error");
  });

  // Login Google
  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserSession(result.user.email);
      showAlert(`Bem-vindo, ${result.user.displayName}`, "success");
      redirectToDashboard();
    } catch(e) {
      console.error(e);
      showAlert("Erro ao autenticar com Google", "error");
    }
  });

  // Redireciona automaticamente se já logado
  if (sessionStorage.getItem('userEmail')) redirectToDashboard();
});
