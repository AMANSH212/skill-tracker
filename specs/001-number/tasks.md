# Tasks: Employee Skills Tracker

**Input**: Design documents from `/specs/001-number/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Create project structure for Vite web app (frontend/, backend/) at repo root
- [X] T002 Initialize Vite frontend with vanilla JS, HTML, CSS in frontend/
- [X] T003 Initialize Node.js backend with SQLite in backend/
- [X] T004 [P] Configure ESLint, Prettier for code quality in both frontend/ and backend/
- [X] T005 [P] Setup Vitest for JS unit/integration tests in frontend/
- [X] T006 [P] Setup basic SQLite schema for employee/skill tables in backend/src/models/

---

## Phase 2: Foundational (Blocking Prerequisites)

- [X] T007 Implement API server with Express in backend/src/api/
- [X] T008 [P] Implement SQLite data access layer in backend/src/services/
- [X] T009 [P] Create Employee and Skill models in backend/src/models/
- [X] T010 [P] Setup API endpoints for CRUD operations in backend/src/api/
- [X] T011 Setup CORS and error handling middleware in backend/src/api/
- [X] T012 [P] Create frontend service for API calls in frontend/src/services/
- [X] T013 [P] Setup environment config for local dev in both frontend/ and backend/

---

## Phase 3: User Story 1 - Add and Edit Employee Skills (Priority: P1) 🏆 MVP

**Goal**: Users can add/edit employee skills, proficiency, last-updated info via modals
**Independent Test**: Add/edit employee, verify table and backend update

- [X] T014 [P] [US1] Create Employee table UI in frontend/src/components/EmployeeTable.js
- [X] T015 [P] [US1] Create modal UI for add/edit in frontend/src/components/EmployeeModal.js
- [X] T016 [US1] Implement add/edit logic in frontend/src/pages/EmployeePage.js
- [X] T017 [US1] Connect frontend modals to backend API for add/edit
- [X] T018 [US1] Add notifications for success/error in frontend/src/components/Notification.js
- [X] T019 [US1] Add backend validation for required fields in backend/src/services/validation.js
- [X] T020 [US1] Add backend logic for updating last-updated info in backend/src/services/employee.js
- [X] T021 [US1] Write unit tests for add/edit logic in frontend/tests/unit/employee.test.js
- [X] T022 [US1] Write integration tests for add/edit API in backend/tests/integration/employee.test.js

---

## Phase 4: User Story 2 - Search, Filter, Sort, and Paginate (Priority: P2)

**Goal**: Users can search, filter, sort, and paginate employee skill records
**Independent Test**: Apply filters/sorts/pagination, verify correct results

- [X] T023 [P] [US2] Implement search/filter UI in frontend/src/components/EmployeeFilter.js
- [X] T024 [P] [US2] Implement sort/pagination UI in frontend/src/components/EmployeeTable.js
- [X] T025 [US2] Implement backend API for search/filter/sort/pagination in backend/src/api/employee.js
- [X] T026 [US2] Connect frontend filter/sort/pagination to backend API
- [X] T027 [US2] Add tests for filter/sort/pagination logic in frontend/tests/unit/filter.test.js
- [X] T028 [US2] Add integration tests for backend filter/sort/pagination in backend/tests/integration/filter.test.js

---

## Phase 5: User Story 3 - Bulk Actions and CSV Import/Export (Priority: P3)

**Goal**: Users can bulk delete, import from CSV, export to CSV
**Independent Test**: Perform bulk delete/import/export, verify correct changes and file formats

- [X] T029 [P] [US3] Implement bulk select/delete UI in frontend/src/components/EmployeeTable.js
- [X] T030 [P] [US3] Implement CSV import UI in frontend/src/components/CSVImport.js
- [X] T031 [P] [US3] Implement CSV export UI in frontend/src/components/CSVExport.js
- [X] T032 [US3] Implement backend API for bulk delete/import/export in backend/src/api/employee.js
- [X] T033 [US3] Add backend logic for CSV parsing/validation in backend/src/services/csv.js
- [X] T034 [US3] Add tests for bulk actions and CSV logic in frontend/tests/unit/csv.test.js
- [X] T035 [US3] Add integration tests for backend bulk/CSV API in backend/tests/integration/csv.test.js

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T036 [P] Documentation updates in specs/001-number/quickstart.md
- [ ] T037 Code cleanup and refactoring in both frontend/ and backend/
- [ ] T038 Performance optimization for table, API, and bulk ops
- [ ] T039 [P] Additional unit tests in frontend/tests/unit/ and backend/tests/unit/
- [ ] T040 Security hardening (input validation, error handling)
- [ ] T041 Run quickstart.md validation

---

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies
- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Parallel Opportunities
- All [P] tasks can run in parallel (different files, no dependencies)
- All user stories can be implemented independently after foundational phase
- Tests for each story can run in parallel

---

## Parallel Example: User Story 1

- T014, T015, T021 can run in parallel (UI, modal, unit tests)
- T019, T020 can run in parallel (backend validation, last-updated logic)

---

## Implementation Strategy

- MVP: Complete Setup, Foundational, and User Story 1
- Incremental: Add User Story 2, then User Story 3
- Parallel: Team members can work on different user stories and [P] tasks simultaneously

---

## Notes
- All tasks follow strict checklist format
- Each user story phase is independently testable
- File paths are explicit
- No cross-story dependencies that break independence
