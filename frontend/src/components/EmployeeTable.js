// frontend/src/components/EmployeeTable.js
export function EmployeeTable({ employees, onEdit, onDelete, onBulkDelete }) {
  const table = document.createElement("table");
  table.className = "employee-table";
  const thead = document.createElement("thead");
  thead.innerHTML = `<tr><th>Name</th><th>Role</th><th>Proficiency</th><th>Last Updated</th><th>Actions</th></tr>`;
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  employees.forEach(emp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${emp.name}</td><td>${emp.role}</td><td>${emp.proficiency || ""}</td><td>${emp.last_updated}</td><td></td>`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => onEdit(emp);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => onDelete(emp);
    const actionsTd = tr.querySelector("td:last-child");
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  // Add sort and pagination controls
  const controls = document.createElement("div");
  controls.className = "table-controls";
  controls.innerHTML = `
    <button id="sort-name">Sort by Name</button>
    <button id="sort-role">Sort by Role</button>
    <button id="prev-page">Prev</button>
    <button id="next-page">Next</button>
  `;
  table.parentNode?.insertBefore(controls, table);
  // Add bulk select/delete controls
  const bulkControls = document.createElement("div");
  bulkControls.className = "bulk-controls";
  bulkControls.innerHTML = `<button id="bulk-delete">Delete Selected</button>`;
  table.parentNode?.insertBefore(bulkControls, table);
  // Bulk select/delete logic
  table.addEventListener("click", (e) => {
    if (e.target.classList.contains("bulk-delete")) {
      const selected = Array.from(table.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);
      onBulkDelete(selected);
    }
  });
  return table;
}
