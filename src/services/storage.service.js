// src/services/storage.service.js

// Salva usuário na sessionStorage
export function setUserSession(email) {
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('userEmail', email);
}

// Retorna o usuário logado
export function getUserSession() {
  return sessionStorage.getItem('userEmail');
}

// Limpa sessão
export function clearUserSession() {
  sessionStorage.clear();
}
