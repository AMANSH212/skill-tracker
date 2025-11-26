// backend/tests/integration/csv.test.js
const csv = require('../../src/services/csv');
describe('CSV Parsing', () => {
  it('parses CSV text to objects', () => {
    const text = 'name,role,last_updated\nAlice,Dev,2025-11-26\nBob,QA,2025-11-25';
    const result = csv.parseCSV(text);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Alice');
  });
});
