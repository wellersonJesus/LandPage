// ------------------------------
// IMPORTS FIREBASE
// ------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ------------------------------
// PEGANDO CREDENCIAIS DO WINDOW
// ------------------------------
const adminCredentials = window.adminCredentials;
const firebaseConfig = window.firebaseConfig;

// ------------------------------
// INICIALIZAÇÃO DO FIREBASE
// ------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ------------------------------
// FUNÇÕES DE UTILIDADE
// ------------------------------
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const showAlert = (message, type = 'info') => {
  alert(`${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${message}`);
};

const setUserSession = (email) => {
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('userEmail', email);
};

const redirectToDashboard = () => {
  window.location.href = "pages/dashboard.html";
};

// ------------------------------
// EVENTO DOMContentLoaded
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleLoginBtn = document.getElementById('googleLogin');

  // LOGIN ADMIN
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) { showAlert("Preencha todos os campos.", "error"); return; }
    if (!isValidEmail(email)) { showAlert("Email inválido.", "error"); return; }

    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUserSession(email);
      showAlert("Login realizado com sucesso!", "success");
      redirectToDashboard();
    } else {
      showAlert("Email ou senha inválidos.", "error");
    }
  });

  // LOGIN GOOGLE
  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserSession(user.email);
      showAlert(`Bem-vindo, ${user.displayName}`, "success");
      redirectToDashboard();
    } catch (error) {
      console.error("Erro no login Google:", error);
      showAlert("Erro ao autenticar com Google.", "error");
    }
  });

  // REDIRECIONAMENTO AUTOMÁTICO
  if (sessionStorage.getItem('loggedIn') === 'true') {
    redirectToDashboard();
  }
});
