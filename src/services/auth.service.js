// src/services/auth.service.js
import { adminCredentials } from '../app/keys.js';
import { firebaseService } from './firebase.service.js';
import { storageService } from './storage.service.js';

class AuthService {
  // Login admin/local
  loginAdmin(email, password) {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      storageService.setItem('loggedIn', true);
      storageService.setItem('userEmail', email);
      return true;
    }
    return false;
  }

  // Login via Google
  async loginGoogle() {
    const email = await firebaseService.loginWithGoogle();
    storageService.setItem('loggedIn', true);
    storageService.setItem('userEmail', email);
    return email;
  }

  logout() {
    storageService.clear();
    firebaseService.logout();
  }

  getUserEmail() {
    return storageService.getItem('userEmail');
  }

  isLoggedIn() {
    return storageService.isLoggedIn();
  }
}

export const authService = new AuthService();
