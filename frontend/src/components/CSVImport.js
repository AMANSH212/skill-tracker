// frontend/src/components/CSVImport.js
export function CSVImport({ onImport }) {
  const container = document.createElement("div");
  container.className = "csv-import";
  container.innerHTML = `
    <input type="file" id="csv-file" accept=".csv" />
    <button id="import-btn">Import CSV</button>
  `;
  container.querySelector("#import-btn").onclick = () => {
    const file = container.querySelector("#csv-file").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onImport(e.target.result);
      reader.readAsText(file);
    }
  };
  return container;
}
