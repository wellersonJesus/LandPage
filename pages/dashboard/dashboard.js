// 🔹 Seletores
const userNameSpan = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header");
const tableTitle = document.getElementById("table-title");
const tipoSelect = document.getElementById("tipo");

// 🔹 Checa autenticação
const token = localStorage.getItem("authToken");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!token || !loggedUser) window.location.href = "/";
if (userNameSpan) userNameSpan.textContent = loggedUser.email;

// 🔹 Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  });
}

// 🔹 Configuração API (usar proxy se tiver CORS)
const API_URL = "/api/zerosheets"; 
const HEADERS = { "Content-Type": "application/json" };

// 🔹 Funções CRUD
async function getData() {
  const res = await fetch(API_URL, { headers: HEADERS });
  return await res.json();
}

async function createRow(payload) {
  const res = await fetch(API_URL, { method: "POST", headers: HEADERS, body: JSON.stringify(payload) });
  return await res.json();
}

async function patchRow(lineNumber, payload) {
  const res = await fetch(`${API_URL}/${lineNumber}`, { method: "PATCH", headers: HEADERS, body: JSON.stringify(payload) });
  return await res.json();
}

async function deleteRow(lineNumber) {
  await fetch(`${API_URL}/${lineNumber}`, { method: "DELETE", headers: HEADERS });
}

// 🔹 Renderiza tabela
async function renderTable(filterTipo) {
  try {
    const data = await getData();
    if (!tableBody || !tableHeader || !tableTitle) return;
    tableBody.innerHTML = "";

    // Atualiza título
    tableTitle.textContent = filterTipo === "Cadastro" ? "Dados do Cadastro" :
                             filterTipo === "Inventario" ? "Dados do Inventário" :
                             "Dados da Planilha";

    // Filtra pelo tipo
    const filtered = filterTipo ? data.filter(r => r.Tipo === filterTipo) : data;
    if (!filtered.length) {
      tableBody.innerHTML = `<tr><td colspan="9" class="text-center">Nenhum registro deste tipo</td></tr>`;
      tableHeader.innerHTML = "";
      return;
    }

    // Colunas por tipo
    const colunasCadastro = ["id", "Nome", "Email", "Telefone"];
    const colunasInventario = ["id", "Produto", "Quantidade ", "Valor"];
    const headers = filterTipo === "Cadastro" ? colunasCadastro : colunasInventario;

    tableHeader.innerHTML = [...headers, "Ações"].map(h => `<th>${h}</th>`).join("");

    // Linhas
    filtered.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = [
        ...headers.map(h => `<td>${row[h] || ""}</td>`),
        `<td class="d-flex gap-1">
          <button class="btn btn-sm btn-primary btn-add" data-line="${row._lineNumber}" title="Adicionar"><i class="fa fa-plus"></i></button>
          <button class="btn btn-sm btn-success btn-edit" data-line="${row._lineNumber}" title="Editar"><i class="fa fa-pen"></i></button>
          <button class="btn btn-sm btn-danger btn-delete" data-line="${row._lineNumber}" title="Remover"><i class="fa fa-trash"></i></button>
        </td>`
      ].join("");
      tableBody.appendChild(tr);
    });

    // Eventos
    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", async () => {
        if (!confirm("Deseja excluir este registro?")) return;
        await deleteRow(btn.dataset.line);
        renderTable(tipoSelect.value);
      })
    );

    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", () => openModal("edit", filtered.find(r => r._lineNumber == btn.dataset.line), headers))
    );

    document.querySelectorAll(".btn-add").forEach(btn =>
      btn.addEventListener("click", () => openModal("add", filtered.find(r => r._lineNumber == btn.dataset.line), headers))
    );

  } catch (err) {
    console.error(err);
    if (tableBody) tableBody.innerHTML = `<tr><td colspan="9" class="text-center text-danger">Erro ao carregar dados</td></tr>`;
  }
}

// 🔹 Modal de adicionar/editar
function openModal(action, row = {}, headers = []) {
  // Cria estrutura do modal dinamicamente
  const modal = document.createElement("div");
  modal.className = "modal fade show";
  modal.style.display = "block";
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${action === "add" ? "Adicionar Registro" : "Editar Registro"}</h5>
          <button type="button" class="btn-close btn-close-white" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          ${headers.map(h => `
            <div class="mb-2">
              <label class="form-label">${h}</label>
              <input type="text" class="form-control" name="${h}" value="${row[h] || ""}">
            </div>`).join("")}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-cancel">Cancelar</button>
          ${action === "edit" ? `<button type="button" class="btn btn-danger btn-delete-modal">Excluir</button>` : ""}
          <button type="button" class="btn btn-primary btn-save">Salvar</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Fechar modal
  modal.querySelector(".btn-close").addEventListener("click", () => modal.remove());
  modal.querySelector(".btn-cancel").addEventListener("click", () => modal.remove());

  // Salvar registro
  modal.querySelector(".btn-save").addEventListener("click", async () => {
    const payload = {};
    headers.forEach(h => {
      const val = modal.querySelector(`input[name="${h}"]`).value;
      payload[h] = val;
    });

    try {
      if (action === "add") await createRow(payload);
      else if (action === "edit") await patchRow(row._lineNumber, payload);
      modal.remove();
      renderTable(tipoSelect.value);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar registro");
    }
  });

  // Excluir do modal
  if (action === "edit") {
    modal.querySelector(".btn-delete-modal").addEventListener("click", async () => {
      if (!confirm("Deseja excluir este registro?")) return;
      await deleteRow(row._lineNumber);
      modal.remove();
      renderTable(tipoSelect.value);
    });
  }
}

// 🔹 Filtra tabela ao mudar tipo
if (tipoSelect) tipoSelect.addEventListener("change", () => renderTable(tipoSelect.value));

// 🔹 Carrega dados inicialmente
renderTable(tipoSelect ? tipoSelect.value : "Cadastro");
