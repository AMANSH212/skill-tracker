// backend/src/services/employee.js
const db = require("../services/db");

module.exports = {
  getAll: (cb) => db.all("SELECT * FROM employees ORDER BY id DESC", cb),
  getById: (id, cb) => db.get("SELECT * FROM employees WHERE id = ?", [id], cb),
  create: (data, cb) => {
    if (!data.name || !data.role || !data.proficiency) {
      cb(new Error("Missing required fields: name, role, proficiency"));
      return;
    }
    db.run(
      "INSERT INTO employees (name, role, proficiency, skills, last_updated) VALUES (?, ?, ?, ?, ?)",
      [data.name, data.role, data.proficiency, data.skills || "", new Date().toISOString()],
      cb
    );
  },
  update: (id, data, cb) => db.run(
    "UPDATE employees SET name = ?, role = ?, proficiency = ?, skills = ?, last_updated = datetime('now') WHERE id = ?",
    [data.name, data.role, data.proficiency, data.skills || "", id],
    cb
  ),
  delete: (id, cb) => db.run("DELETE FROM employees WHERE id = ?", [id], cb)
};
