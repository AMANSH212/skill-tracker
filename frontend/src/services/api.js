// frontend/src/services/api.js
const API_BASE = "http://localhost:3001/api";

export async function getEmployees() {
  const res = await fetch(`${API_BASE}/employees`);
  return res.json();
}

export async function getEmployee(id) {
  const res = await fetch(`${API_BASE}/employees/${id}`);
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch(`${API_BASE}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEmployee(id, data) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE}/employees/${id}`, {
    method: "DELETE" });
  return res.json();
}

export async function searchEmployees({ keyword = "", sort = "name", page = 1, pageSize = 10 }) {
  const params = new URLSearchParams({ keyword, sort, page, pageSize });
  const res = await fetch(`${API_BASE}/employees/search?${params}`);
  return res.json();
}
