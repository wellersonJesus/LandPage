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

// 🔹 Configuração ZeroSheets
const API_URL = "https://api.zerosheets.com/v1/g1t";
const HEADERS = { Authorization: `Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw`, "Content-Type": "application/json" };

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

// 🔹 Renderiza tabela filtrando por tipo e atualiza título
async function renderTable(filterTipo) {
  try {
    const data = await getData();
    if (!tableBody || !tableHeader || !tableTitle) return;
    tableBody.innerHTML = "";

    // Atualiza título da tabela
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

    // Define colunas visíveis dependendo do tipo
    const colunasCadastro = ["id", "Nome", "Email", "Telefone", "Produto", "Quantidade ", "Valor"];
    const colunasInventario = ["Produto", "Quantidade ", "Valor"];
    const headers = filterTipo === "Cadastro" ? colunasCadastro : colunasInventario;

    tableHeader.innerHTML = [...headers, "Ações"].map(h => `<th>${h}</th>`).join("");

    // Linhas
    filtered.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = [
        ...headers.map(h => `<td>${row[h] || ""}</td>`),
        `<td class="d-flex gap-1">
          <button class="btn btn-sm btn-primary btn-add" data-line="${row._lineNumber}">
            <i class="fa fa-plus"></i>
          </button>
          <button class="btn btn-sm btn-success btn-edit" data-line="${row._lineNumber}"><i class="fa fa-pen"></i></button>
          <button class="btn btn-sm btn-danger btn-delete" data-line="${row._lineNumber}"><i class="fa fa-trash"></i></button>
        </td>`
      ].join("");
      tableBody.appendChild(tr);
    });

    // Eventos dos botões
    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", async () => {
        if (!confirm("Deseja excluir este registro?")) return;
        await deleteRow(btn.dataset.line);
        renderTable(tipoSelect.value);
      })
    );

    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", () => {
        const row = filtered.find(r => r._lineNumber == btn.dataset.line);
        if (!row) return;
        document.getElementById("nome").value = row.Nome || "";
        document.getElementById("status").value = row.Status || "Ativo";
        document.getElementById("tipo").value = row.Tipo || "Cadastro";
        dataForm.dataset.editing = btn.dataset.line;
      })
    );

    document.querySelectorAll(".btn-add").forEach(btn =>
      btn.addEventListener("click", () => {
        const row = filtered.find(r => r._lineNumber == btn.dataset.line);
        if (!row) return;
        const payload = {};
        headers.forEach(col => payload[col] = row[col] || "");
        createRow(payload).then(() => renderTable(tipoSelect.value));
      })
    );

  } catch (err) {
    console.error(err);
    if (tableBody) tableBody.innerHTML = `<tr><td colspan="9" class="text-center text-danger">Erro ao carregar dados</td></tr>`;
  }
}

// 🔹 Filtra tabela e atualiza título quando muda tipo
if (tipoSelect) tipoSelect.addEventListener("change", () => renderTable(tipoSelect.value));

// 🔹 Carrega dados inicialmente (padrão Cadastro)
renderTable(tipoSelect ? tipoSelect.value : "Cadastro");
