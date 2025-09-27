import { adminCredentials, firebaseConfig } from './keys.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Debug: ver se as credenciais estão sendo carregadas
console.log("adminCredentials carregado:", adminCredentials);
console.log("firebaseConfig carregado:", firebaseConfig);

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Utilitários
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const showAlert = (msg,type='info') => alert(`${type==='success'?'✅':type==='error'?'❌':'ℹ️'} ${msg}`);
const setUserSession = email => sessionStorage.setItem('userEmail', email);

const redirectToDashboard = () => {
  const repo = 'ws-gestao';
  const base = (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'))
    ? 'pages/dashboard.html'
    : `${window.location.origin}/${repo}/pages/dashboard.html`;
  window.location.href = base;
};

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

    if(!email || !password){ showAlert("Preencha todos os campos","error"); return; }
    if(!isValidEmail(email)){ showAlert("Email inválido","error"); return; }

    if(email===adminCredentials.email && password===adminCredentials.password){
      setUserSession(email);
      showAlert("Login realizado com sucesso!","success");
      redirectToDashboard();
    } else showAlert("Email ou senha inválidos","error");
  });

  // Login Google
  googleLoginBtn.addEventListener('click', async () => {
    try{
      const result = await signInWithPopup(auth,provider);
      setUserSession(result.user.email);
      showAlert(`Bem-vindo, ${result.user.displayName}`,"success");
      redirectToDashboard();
    }catch(e){
      console.error(e);
      showAlert("Erro ao autenticar com Google","error");
    }
  });

  // Redireciona se já logado
  if(sessionStorage.getItem('userEmail')) redirectToDashboard();
});
