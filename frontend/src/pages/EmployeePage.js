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
  const filterRole = document.getElementById("filter-role"); // Declare only ONCE here
  const filterBtn = document.getElementById("filter-btn");
  const clearBtn = document.getElementById("clear-filter-btn");

  filterBtn.onclick = () => {
    const keyword = filterKeyword.value.trim().toLowerCase();
    const proficiency = filterProficiency.value;
    const role = filterRole.value;
    let filtered = employees.filter(emp => {
      let match = true;
      if (keyword) {
        match = match && (
          emp.name.toLowerCase().includes(keyword) ||
          (emp.skills && emp.skills.toLowerCase().includes(keyword))
        );
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

  function updateRoleFilterOptions(employees) {
    const filterRole = document.getElementById("filter-role");
    if (!filterRole) return;
    const currentValue = filterRole.value;
    // Remove all options except "All Roles"
    filterRole.innerHTML = '<option value="all">All Roles</option>';
    const uniqueRoles = [...new Set(employees.map(emp => emp.role))];
    uniqueRoles.forEach(role => {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      filterRole.appendChild(option);
    });
    // Restore previous selection if possible
    filterRole.value = currentValue;
  }

  // Populate roles in filter dynamically
  const uniqueRoles = [...new Set(employees.map(emp => emp.role))];
  uniqueRoles.forEach(role => {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    filterRole.appendChild(option); // Use the already declared filterRole
  });

  let sortField = null;
  let sortAsc = true;

  function sortEmployees(employees, field, asc) {
    return [...employees].sort((a, b) => {
      if (a[field] == null) return 1;
      if (b[field] == null) return -1;
      if (typeof a[field] === "string") {
        return asc
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
      // For dates or numbers
      return asc ? a[field] - b[field] : b[field] - a[field];
    });
  }

  function renderTable(filteredEmployees) {
    let rows = filteredEmployees;
    if (sortField) {
      rows = sortEmployees(rows, sortField, sortAsc);
    }
    const tbody = document.querySelector("#employee-table tbody");
    tbody.innerHTML = rows.map(emp => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.proficiency || ""}</td>
        <td>${emp.skills || ""}</td>
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
        updateRoleFilterOptions(employees); // update after delete
        showNotification("Employee deleted", "success");
      };
    });
    // Highlight active sort icon
    document.querySelectorAll('.sort-icon').forEach(icon => {
      icon.classList.toggle('active', icon.dataset.field === sortField);
      icon.textContent = icon.dataset.field === sortField
        ? (sortAsc ? '↑' : '↓')
        : '⇅';
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
        match = match && (
          emp.name.toLowerCase().includes(keyword) ||
          (emp.skills && emp.skills.toLowerCase().includes(keyword))
        );
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
  document.getElementById("add-skills-btn").onclick = showAddModal;

  async function showAddModal() {
    const modalHtml = await fetch("./src/components/EmployeeModal.html").then(r => r.text());
    const modal = document.createElement("div");
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal);
    const form = modal.querySelector("form");
    form.onsubmit = async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      await api.createEmployee(data);
      employees = await api.getEmployees();
      renderTable(employees);
      updateRoleFilterOptions(employees);
      showNotification("Skills added", "success");
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
      renderTable(employees);
      updateRoleFilterOptions(employees); // update after edit
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

  // Initial population after fetching employees
  updateRoleFilterOptions(employees);

  // Add event listeners to sort icons
  document.querySelectorAll('.sort-icon').forEach(icon => {
    icon.onclick = () => {
      const field = icon.dataset.field;
      if (sortField === field) {
        sortAsc = !sortAsc;
      } else {
        sortField = field;
        sortAsc = true;
      }
      renderTable(employees);
    };
  });
}
