// backend/src/api/employee.js
const express = require("express");
const router = express.Router();
const employeeService = require("../services/employee");
const csvService = require("../services/csv");
const db = require('../services/db');

// Get all employees
router.get("/", (req, res) => {
  employeeService.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get employee by ID
router.get("/:id", (req, res) => {
  employeeService.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

// Create employee
router.post("/", (req, res) => {
  const { name, role, proficiency, skills } = req.body; // <-- add skills here
  employeeService.create({ name, role, proficiency, skills }, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    employeeService.getAll((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(rows);
    });
  });
});

// Update employee
router.put("/:id", (req, res) => {
  const { name, role, proficiency, skills, last_updated } = req.body; // <-- add skills here
  employeeService.update(req.params.id, { name, role, proficiency, skills, last_updated }, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete employee
router.delete("/:id", (req, res) => {
  employeeService.delete(req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Bulk delete endpoint
router.post("/bulk-delete", async (req, res) => {
  const ids = req.body.ids;
  if (!Array.isArray(ids)) return res.status(400).json({ error: "Invalid ids" });
  await db.run("DELETE FROM employees WHERE id IN (" + ids.map(() => "?").join(",") + ")", ids);
  res.json({ success: true });
});

// CSV import endpoint
router.post("/import-csv", async (req, res) => {
  const { csv } = req.body;
  if (!csv) return res.status(400).json({ error: "Missing CSV data" });
  const rows = csvService.parseCSV(csv);
  // Validate and insert rows
  for (const row of rows) {
    // Assume validation and upsert logic here
    await db.run("INSERT OR REPLACE INTO employee (name, role, last_updated) VALUES (?, ?, ?)", [row.name, row.role, row.last_updated]);
  }
  res.json({ success: true, count: rows.length });
});

// CSV export endpoint
router.get("/export-csv", async (req, res) => {
  const employees = await db.all("SELECT * FROM employees");
  const csv = [Object.keys(employees[0] || {}).join(",")].concat(employees.map(e => Object.values(e).join(","))).join("\n");
  res.header("Content-Type", "text/csv");
  res.send(csv);
});

module.exports = router;
