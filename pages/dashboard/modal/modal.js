import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';

const modalsContainer = document.getElementById('modals-container');

async function loadModal(url) {
  const res = await fetch(url);
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  modalsContainer.appendChild(div);
}

// Carrega todos os modais do dashboard
loadModal('/pages/dashboard/modals/addDashboardModal.html');
loadModal('/pages/dashboard/modals/editDashboardModal.html');
loadModal('/pages/dashboard/modals/deleteDashboardModal.html');
