import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig } from '../app/keys.js';

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Google
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error("Erro no login Google:", err);
    throw err;
  }
}

// Logout
export function logout() {
  auth.signOut();
}
