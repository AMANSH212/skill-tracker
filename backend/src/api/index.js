// backend/src/api/index.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
const dbPath = path.join(__dirname, "../models/schema.db");
const schemaPath = path.join(__dirname, "../models/schema.sql");

app.use(cors());
app.use(express.json());

// Initialize SQLite DB and schema
const db = new sqlite3.Database(dbPath);
const fs = require("fs");
const schema = fs.readFileSync(schemaPath, "utf8");
db.exec(schema);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Employee API router
const employeeRouter = require("./employee");
app.use("/api/employees", employeeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
