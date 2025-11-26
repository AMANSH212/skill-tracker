// frontend/src/pages/EmployeePage.js
import * as api from "../services/api.js";
import '../components/EmployeeTable.css';
import '../components/EmployeeFilter.css';
import '../components/EmployeeModal.css';
import '../components/Notification.css';
import '../components/charts/Chart.css';

export async function EmployeePage(root) {
  // Load main layout HTML
  const pageHtml = await fetch("./src/pages/EmployeePage.html").then(r => r.text());
  root.innerHTML = pageHtml;

  // Inject logo (already present in HTML)

  // Load and inject charts
  const pieHtml = await fetch("./src/components/charts/PieChart.html").then(r => r.text());
  const barHtml = await fetch("./src/components/charts/BarChart.html").then(r => r.text());
  document.getElementById("pie-chart").innerHTML = pieHtml;
  document.getElementById("bar-chart").innerHTML = barHtml;

  // Inject filter with clear handler
  const filterHtml = await fetch("./src/components/EmployeeFilter.html").then(r => r.text());
  document.getElementById("employee-filter-container").innerHTML = filterHtml;

  // Filtering logic
  const filterKeyword = document.getElementById("filter-keyword");
  const filterProficiency = document.getElementById("filter-proficiency");
  const filterRole = document.getElementById("filter-role");
  const filterBtn = document.getElementById("filter-btn");
  const clearBtn = document.getElementById("clear-filter-btn");

  filterBtn.onclick = () => {
    const keyword = filterKeyword.value.trim().toLowerCase();
    const proficiency = filterProficiency.value;
    const role = filterRole.value;
    let filtered = employees.filter(emp => {
      let match = true;
      if (keyword) {
        match = match && emp.name.toLowerCase().includes(keyword);
      }
      if (proficiency && proficiency !== "all") {
        match = match && emp.proficiency === proficiency;
      }
      if (role && role !== "all") {
        match = match && emp.role === role;
      }
      return match;
    });
    renderTable(filtered);
  };

  clearBtn.onclick = () => {
    filterKeyword.value = '';
    filterProficiency.value = 'all';
    filterRole.value = 'all';
    renderTable(employees);
  };

  // Load and inject employee table
  const tableHtml = await fetch("./src/components/EmployeeTable.html").then(r => r.text());
  document.getElementById("employee-table-container").innerHTML = tableHtml;

  // Render employee rows
  let employees = await api.getEmployees();
  function renderTable(filteredEmployees) {
    const tbody = document.querySelector("#employee-table tbody");
    tbody.innerHTML = filteredEmployees.map(emp => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.proficiency || ""}</td>
        <td>${emp.last_updated || ""}</td>
        <td>
          <button class="edit-btn" data-id="${emp.id}">Edit</button>
          <button class="delete-btn" data-id="${emp.id}">Delete</button>
        </td>
      </tr>
    `).join("");

    // Attach event listeners to new buttons
    tbody.querySelectorAll(".edit-btn").forEach(btn => {
      btn.onclick = () => {
        const emp = employees.find(emp => emp.id == btn.dataset.id);
        showEditModal(emp);
      };
    });
    tbody.querySelectorAll(".delete-btn").forEach(btn => {
      btn.onclick = async () => {
        const emp = employees.find(emp => emp.id == btn.dataset.id);
        await api.deleteEmployee(emp.id);
        employees = await api.getEmployees();
        renderTable(employees);
        showNotification("Employee deleted", "success");
      };
    });
  }
  renderTable(employees);

  // Filter handler
  filterBtn.onclick = () => {
    const keyword = filterKeyword.value.trim().toLowerCase();
    const proficiency = filterProficiency.value;
    const role = filterRole.value;
    let filtered = employees.filter(emp => {
      let match = true;
      if (keyword) {
        match = match && emp.name.toLowerCase().includes(keyword);
      }
      if (proficiency && proficiency !== "all") {
        match = match && emp.proficiency === proficiency;
      }
      if (role && role !== "all") {
        match = match && emp.role === role;
      }
      return match;
    });
    renderTable(filtered);
  };

  // Add Employee button
  document.getElementById("add-employee-btn").onclick = showAddModal;

  // Edit/Delete actions
  tbody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const emp = employees.find(emp => emp.id == e.target.dataset.id);
      showEditModal(emp);
    }
    if (e.target.classList.contains("delete-btn")) {
      const emp = employees.find(emp => emp.id == e.target.dataset.id);
      await api.deleteEmployee(emp.id);
      employees = await api.getEmployees();
      tbody.innerHTML = employees.map(emp => `
        <tr>
          <td>${emp.name}</td>
          <td>${emp.role}</td>
          <td>${emp.proficiency || ""}</td>
          <td>${emp.last_updated || ""}</td>
          <td>
            <button class="edit-btn" data-id="${emp.id}">Edit</button>
            <button class="delete-btn" data-id="${emp.id}">Delete</button>
          </td>
        </tr>
      `).join("");
      showNotification("Employee deleted", "success");
    }
  });

  // Modal logic
  async function showAddModal() {
    const modalHtml = await fetch("./src/components/EmployeeModal.html").then(r => r.text());
    const modal = document.createElement("div");
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal);
    const form = modal.querySelector("form");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const result = await api.createEmployee(data);
      if (Array.isArray(result)) {
        employees = result;
      } else {
        employees = await api.getEmployees();
      }
      renderTable(employees); // Use renderTable instead of tbody.innerHTML
      showNotification("Employee added", "success");
      modal.remove();
    };
    modal.querySelector("#close-modal").onclick = () => modal.remove();
  }

  async function showEditModal(emp) {
    const modalHtml = await fetch("./src/components/EmployeeModal.html").then(r => r.text());
    const modal = document.createElement("div");
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal);
    const form = modal.querySelector("form");
    form.name.value = emp.name;
    form.role.value = emp.role;
    form.proficiency.value = emp.proficiency || "";
    form.onsubmit = async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      await api.updateEmployee(emp.id, data);
      employees = await api.getEmployees();
      renderTable(employees); // Use renderTable instead of tbody.innerHTML
      showNotification("Employee updated", "success");
      modal.remove();
    };
    modal.querySelector("#close-modal").onclick = () => modal.remove();
  }

  // Notification logic
  async function showNotification(message, type) {
    const notifHtml = await fetch("./src/components/Notification.html").then(r => r.text());
    const notif = document.createElement("div");
    notif.innerHTML = notifHtml;
    notif.querySelector("#notification-message").textContent = message;
    notif.classList.add(type);
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
  }
}
