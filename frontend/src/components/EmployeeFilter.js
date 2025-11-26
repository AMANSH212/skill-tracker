// frontend/src/components/EmployeeFilter.js
import './EmployeeFilter.css';

export async function EmployeeFilter({ onFilter, onClear }) {
  const html = await fetch('./src/components/EmployeeFilter.html').then(r => r.text());
  const container = document.createElement('div');
  container.innerHTML = html;
  container.querySelector('#filter-btn').onclick = () => {
    const keyword = container.querySelector('#filter-keyword').value;
    const proficiency = container.querySelector('#filter-proficiency').value;
    const role = container.querySelector('#filter-role').value;
    onFilter({ keyword, proficiency, role });
  };
  container.querySelector('#clear-filter-btn').onclick = () => {
    container.querySelector('#filter-keyword').value = '';
    container.querySelector('#filter-proficiency').value = 'all';
    container.querySelector('#filter-role').value = 'all';
    if (onClear) onClear();
  };
  return container.firstElementChild;
}
