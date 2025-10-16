const tipoSelect = document.getElementById("tipo");
const formFields = document.getElementById("formFields");
const dataForm = document.getElementById("dataForm");
const responseMsg = document.getElementById("responseMsg");
const tableHeader = document.getElementById("table-header");
const tableBody = document.getElementById("table-body");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editFields = document.getElementById("editFields");
const closeModal = document.querySelector(".close");

const columns = {
  Cadastro: ["Nome", "Email", "Telefone"],
  Inventario: ["Produto", "Quantidade ", "Valor"]
};

let currentData = [];
let currentTipo = "Cadastro";
let editingLine = null;

// Funções ZeroSheets
async function getData() {
  const res = await fetch("https://api.zerosheets.com/v1/g1t", {
    method: "GET",
    headers: { Authorization: "Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw" }
  });
  return await res.json();
}

async function createRow(payload) {
  const res = await fetch("https://api.zerosheets.com/v1/g1t", {
    method: "POST",
    headers: { Authorization: "Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw" },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

async function patchRow(lineNumber, payload) {
  const res = await fetch(`https://api.zerosheets.com/v1/g1t/${lineNumber}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw" },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

async function deleteRow(lineNumber) {
  await fetch(`https://api.zerosheets.com/v1/g1t/${lineNumber}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer hqzrV9MU0WOawxgz9Zqd28MRNbeABuyw" }
  });
}

// Renderiza campos do formulário
function renderFormFields() {
  formFields.innerHTML = "";
  columns[currentTipo].forEach(col => {
    const label = document.createElement("label");
    label.textContent = col;
    const input = document.createElement("input");
    input.id = col;
    input.name = col;
    label.appendChild(input);
    formFields.appendChild(label);
  });
}

// Renderiza tabela
function renderTable() {
  // Cabeçalho
  tableHeader.innerHTML = "";
  const thTipo = document.createElement("th");
  thTipo.textContent = "Tipo";
  tableHeader.appendChild(thTipo);
  columns[currentTipo].forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    tableHeader.appendChild(th);
  });
  const thAcoes = document.createElement("th");
  thAcoes.textContent = "Ações";
  tableHeader.appendChild(thAcoes);

  // Corpo
  tableBody.innerHTML = "";
  currentData
    .filter(r => r.Tipo === currentTipo)
    .forEach(r => {
      const tr = document.createElement("tr");
      const tdTipo = document.createElement("td");
      tdTipo.textContent = r.Tipo;
      tr.appendChild(tdTipo);

      columns[currentTipo].forEach(col => {
        const td = document.createElement("td");
        td.textContent = r[col] || "";
        tr.appendChild(td);
      });

      const tdActions = document.createElement("td");
      tdActions.className = "actions";

      const delBtn = document.createElement("button");
      delBtn.textContent = "Excluir";
      delBtn.className = "deleteBtn";
      delBtn.onclick = async () => {
        await deleteRow(r._lineNumber);
        loadData();
      };

      const editBtn = document.createElement("button");
      editBtn.textContent = "Atualizar";
      editBtn.className = "refreshBtn";
      editBtn.onclick = () => openEditModal(r);

      tdActions.appendChild(editBtn);
      tdActions.appendChild(delBtn);

      tr.appendChild(tdActions);
      tableBody.appendChild(tr);
    });
}

// Modal de edição
function openEditModal(row) {
  editFields.innerHTML = "";
  editingLine = row._lineNumber;
  columns[currentTipo].forEach(col => {
    const label = document.createElement("label");
    label.textContent = col;
    const input = document.createElement("input");
    input.name = col;
    input.value = row[col] || "";
    label.appendChild(input);
    editFields.appendChild(label);
  });
  editModal.style.display = "block";
}

closeModal.onclick = () => (editModal.style.display = "none");
window.onclick = e => { if (e.target === editModal) editModal.style.display = "none"; };

// Carrega dados
async function loadData() {
  currentData = await getData();
  renderTable();
}

// Mudança de tipo
tipoSelect.addEventListener("change", () => {
  currentTipo = tipoSelect.value;
  renderFormFields();
  renderTable();
});

// Submissão formulário
dataForm.addEventListener("submit", async e => {
  e.preventDefault();
  const payload = { Tipo: currentTipo };
  columns[currentTipo].forEach(col => {
    payload[col] = document.getElementById(col).value;
  });
  await createRow(payload);
  dataForm.reset();
  renderFormFields();
  loadData();
});

// Submissão modal
editForm.addEventListener("submit", async e => {
  e.preventDefault();
  const payload = {};
  Array.from(editFields.querySelectorAll("input")).forEach(input => {
    payload[input.name] = input.value;
  });
  await patchRow(editingLine, payload);
  editModal.style.display = "none";
  loadData();
});

// Inicialização
renderFormFields();
loadData();
