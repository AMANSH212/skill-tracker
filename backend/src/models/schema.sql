-- SQLite schema for Employee Skills Tracker
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  proficiency TEXT NOT NULL,
  skills TEXT, -- Add this line
  last_updated TEXT NOT NULL
);
