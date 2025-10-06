// src/services/auth.service.js
import { adminCredentials } from '../app/keys.js';
import * as firebaseService from './firebase.service.js';
import * as storageService from './storage.service.js';

class AuthService {
  loginAdmin(email, password) {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      storageService.setUserSession(email);
      return true;
    }
    return false;
  }

  async loginGoogle() {
    const user = await firebaseService.signInWithGoogle();
    storageService.setUserSession(user.email);
    return user.email;
  }

  logout() {
    storageService.clearUserSession();
    firebaseService.logoutFirebase();
  }

  getUserEmail() {
    return storageService.getUserSession();
  }

  isLoggedIn() {
    return storageService.isLoggedIn();
  }
}

export const authService = new AuthService();
