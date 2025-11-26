// frontend/src/components/CSVExport.js
export function CSVExport({ data }) {
  const container = document.createElement("div");
  container.className = "csv-export";
  container.innerHTML = `<button id="export-btn">Export CSV</button>`;
  container.querySelector("#export-btn").onclick = () => {
    const csv = [Object.keys(data[0]).join(",")].concat(
      data.map(row => Object.values(row).join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employees.csv";
    link.click();
  };
  return container;
}
