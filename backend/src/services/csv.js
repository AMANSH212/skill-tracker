// backend/src/services/csv.js
const { parse } = require('csv-parse/sync');
module.exports = {
  parseCSV: (csvText) => parse(csvText, { columns: true, skip_empty_lines: true })
};
