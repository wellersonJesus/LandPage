// src/services/firebase.service.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig } from '../app/keys.js'; // ou keys-global.js

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para login com Google
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // retorna usuário autenticado
  } catch (err) {
    console.error("Erro no login Google:", err);
    throw err;
  }
}
