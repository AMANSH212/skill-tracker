// frontend/src/components/EmployeeFilter.js
export function EmployeeFilter({ onFilter }) {
  const container = document.createElement("div");
  container.className = "employee-filter";
  container.innerHTML = `
    <input type="text" id="filter-keyword" placeholder="Search by name or role..." />
    <button id="filter-btn">Filter</button>
  `;
  container.querySelector("#filter-btn").onclick = () => {
    const keyword = container.querySelector("#filter-keyword").value;
    onFilter({ keyword });
  };
  return container;
}
