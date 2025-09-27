const redirectToLogin = () => {
  const repo = 'ws-gestao';
  const base = (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'))
    ? '../index.html'
    : `${window.location.origin}/${repo}/index.html`;
  window.location.href = base;
};

const userEmail = sessionStorage.getItem('userEmail');
if(userEmail){
  const el = document.getElementById('userEmail');
  if(el) el.innerText = userEmail;
}else{
  redirectToLogin();
}

const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click',()=>{
    sessionStorage.clear();
    redirectToLogin();
  });
}
