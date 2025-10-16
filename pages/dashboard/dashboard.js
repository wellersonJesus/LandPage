// 🔹 Seletores
const userNameSpan = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const tableBody = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header");
const dataForm = document.getElementById("dataForm");
const responseMsg = document.getElementById("responseMsg");
const tipoSelect = document.getElementById("tipo");

// 🔹 Checa autenticação
const token = localStorage.getItem("authToken");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (!token || !loggedUser) window.location.href = "/";
userNameSpan.textContent = loggedUser.email;

// 🔹 Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("loggedUser");
  window.location.href = "/";
});

// 🔹 Funções ZeroSheets
const API_URL = "https://api.zerosheets.com/v1/g1t";
const HEADERS = { Authorization: `Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw`, "Content-Type": "application/json" };

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

// 🔹 Renderiza tabela filtrando por tipo
async function renderTable(filterTipo = null) {
  try {
    const data = await getData();
    tableBody.innerHTML = "";

    if (!data.length) {
      tableBody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum registro encontrado</td></tr>`;
      tableHeader.innerHTML = "";
      return;
    }

    // Filtra pelo tipo
    const filtered = filterTipo ? data.filter(r => r.tipo === filterTipo) : data;

    // Cabeçalho dinâmico
    const headers = Object.keys(filtered[0]).filter(k => k !== "_lineNumber");
    tableHeader.innerHTML = [...headers, "Ações"].map(h => `<th>${h}</th>`).join("");

    // Linhas
    filtered.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = [
        ...headers.map(h => `<td>${row[h] || ""}</td>`),
        `<td class="d-flex gap-1">
          <button class="btn btn-sm btn-success btn-edit" data-line="${row._lineNumber}"><i class="fa fa-pen"></i></button>
          <button class="btn btn-sm btn-danger btn-delete" data-line="${row._lineNumber}"><i class="fa fa-trash"></i></button>
        </td>`
      ].join("");
      tableBody.appendChild(tr);
    });

    // Eventos editar/deletar
    document.querySelectorAll(".btn-delete").forEach(btn =>
      btn.addEventListener("click", async e => {
        if (!confirm("Deseja excluir este registro?")) return;
        await deleteRow(btn.dataset.line);
        renderTable(tipoSelect.value);
      })
    );

    document.querySelectorAll(".btn-edit").forEach(btn =>
      btn.addEventListener("click", e => {
        const row = filtered.find(r => r._lineNumber == btn.dataset.line);
        document.getElementById("nome").value = row.nome || "";
        document.getElementById("status").value = row.status || "Ativo";
        document.getElementById("tipo").value = row.tipo || "Cadastro";
        dataForm.dataset.editing = btn.dataset.line;
      })
    );

  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar dados</td></tr>`;
  }
}

// 🔹 Adicionar/Editar registro
dataForm.addEventListener("submit", async e => {
  e.preventDefault();
  const payload = {
    tipo: document.getElementById("tipo").value,
    nome: document.getElementById("nome").value,
    status: document.getElementById("status").value,
  };

  try {
    if (dataForm.dataset.editing) {
      await patchRow(dataForm.dataset.editing, payload);
      delete dataForm.dataset.editing;
      responseMsg.textContent = "✅ Registro atualizado!";
    } else {
      await createRow(payload);
      responseMsg.textContent = "✅ Registro adicionado!";
    }

    responseMsg.classList.remove("text-danger");
    responseMsg.classList.add("text-success");
    dataForm.reset();
    renderTable(tipoSelect.value);

  } catch (err) {
    console.error(err);
    responseMsg.textContent = "❌ Erro ao salvar registro!";
    responseMsg.classList.remove("text-success");
    responseMsg.classList.add("text-danger");
  }
});

// 🔹 Filtrar tabela ao mudar tipo
tipoSelect.addEventListener("change", () => renderTable(tipoSelect.value));

// 🔹 Carrega todos os dados inicialmente
renderTable();
