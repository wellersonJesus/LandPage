export function setUserSession(email) {
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('userEmail', email);
}

export function getUserSession() {
  return sessionStorage.getItem('userEmail');
}

export function isLoggedIn() {
  return sessionStorage.getItem('loggedIn') === 'true';
}

export function clearUserSession() {
  sessionStorage.clear();
}
