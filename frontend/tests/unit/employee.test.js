// frontend/tests/unit/employee.test.js
import { describe, it, expect } from "vitest";
import { EmployeeTable } from "../../src/components/EmployeeTable.js";

describe("EmployeeTable", () => {
  it("renders employee rows", () => {
    const employees = [
      { name: "Alice", role: "Dev", last_updated: "2025-11-26" },
      { name: "Bob", role: "QA", last_updated: "2025-11-25" }
    ];
    const table = EmployeeTable({ employees, onEdit: () => {}, onDelete: () => {} });
    expect(table.querySelectorAll("tbody tr").length).toBe(2);
  });
});
