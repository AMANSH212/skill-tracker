// frontend/tests/unit/filter.test.js
import { describe, it, expect } from "vitest";
import { EmployeeFilter } from "../../src/components/EmployeeFilter.js";

describe("EmployeeFilter", () => {
  it("renders filter input", () => {
    const filter = EmployeeFilter({ onFilter: () => {} });
    expect(filter.querySelector("#filter-keyword")).not.toBeNull();
  });
});
