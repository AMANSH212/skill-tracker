-- SQLite schema for Employee Skills Tracker
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  proficiency TEXT NOT NULL,
  last_updated TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  proficiency_scale INTEGER NOT NULL DEFAULT 5
);

CREATE TABLE IF NOT EXISTS employee_skills (
  employee_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  proficiency INTEGER NOT NULL,
  last_updated TEXT NOT NULL,
  PRIMARY KEY (employee_id, skill_id),
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
