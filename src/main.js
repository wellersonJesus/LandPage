import { Router } from './app/router.js';

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ) {
    Router.navigate('pages/login/login.html');
  }
});
