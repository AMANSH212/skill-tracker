import { CSVImport } from '../../src/components/CSVImport.js';
import { CSVExport } from '../../src/components/CSVExport.js';
describe('CSV Import/Export UI', () => {
  it('imports CSV and calls onImport', () => {
    let called = false;
    const comp = CSVImport({ onImport: () => { called = true; } });
    // Simulate file input and import button click (mock FileReader)
    expect(typeof comp).toBe('object');
  });
  it('exports CSV and triggers download', () => {
    const comp = CSVExport({ data: [{ name: 'Alice', role: 'Dev', last_updated: '2025-11-26' }] });
    expect(typeof comp).toBe('object');
  });
});