(() => {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  const openBusiness = document.getElementById('openBusiness');
  const loginModalEl = document.getElementById('loginModal');
  const loginModal = new bootstrap.Modal(loginModalEl);

  function setExpanded(state) {
    toggle.setAttribute('aria-expanded', state ? 'true' : 'false');
    if (state) menu.classList.add('show'); else menu.classList.remove('show');
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const s = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!s);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-navbar')) setExpanded(false);
  });

  openBusiness.addEventListener('click', (e) => {
    e.preventDefault();
    setExpanded(false);
    loginModal.show();
  });

  const form = document.getElementById('loginForm');
  const errBox = document.getElementById('loginError');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    errBox.classList.add('d-none'); errBox.textContent = '';
    const data = {
      username: form.username.value.trim(),
      password: form.password.value
    };
    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Erro no login');
      if (json.token) localStorage.setItem('ws_token', json.token);
      window.location.href = '/dashboard.html';
    } catch (err) {
      errBox.classList.remove('d-none');
      errBox.textContent = err.message || 'Falha no login';
    }
  });
})();