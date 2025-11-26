// frontend/src/components/EmployeeModal.js
export function EmployeeModal({ employee, onSave, onClose }) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <label>Name: <input type="text" id="emp-name" value="${employee?.name || ""}" /></label><br>
      <label>Role: <input type="text" id="emp-role" value="${employee?.role || ""}" /></label><br>
      <label>Last Updated: <input type="date" id="emp-last-updated" value="${employee?.last_updated || ""}" /></label><br>
      <button id="save-btn">Save</button>
      <button id="close-btn">Cancel</button>
    </div>
  `;
  modal.querySelector("#save-btn").onclick = () => {
    const name = modal.querySelector("#emp-name").value;
    const role = modal.querySelector("#emp-role").value;
    const last_updated = modal.querySelector("#emp-last-updated").value;
    onSave({ ...employee, name, role, last_updated });
  };
  modal.querySelector("#close-btn").onclick = onClose;
  return modal;
}
