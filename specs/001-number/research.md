# Phase 0 Research: Employee Skills Tracker

## Decision: Vite + Vanilla JS/HTML/CSS + SQLite
- **Rationale**: Minimal dependencies, fast build, easy local dev, SQLite is lightweight and reliable for local storage.
- **Alternatives considered**: React, Angular, Vue (rejected for complexity and extra dependencies); IndexedDB (rejected for lack of SQL features and harder bulk ops).

## Decision: CSV Import/Export
- **Rationale**: CSV is universally supported, easy for bulk upload/download, works with spreadsheets.
- **Alternatives considered**: XLSX, JSON (rejected for complexity and lack of universal support).

## Decision: Bulk Actions (Delete, Import, Export)
- **Rationale**: Improves admin efficiency, matches user expectations for team management.
- **Alternatives considered**: Single-record actions only (rejected for poor UX with large datasets).

## Decision: SQLite for Metadata Only
- **Rationale**: No images/files, only skill/employee metadata, keeps storage simple and fast.
- **Alternatives considered**: File uploads, cloud DBs (rejected for scope and privacy).

## Decision: Pagination and Filtering
- **Rationale**: Required for large datasets, improves performance and usability.
- **Alternatives considered**: Infinite scroll (rejected for complexity and accessibility).

## Decision: Testing with Vitest + Manual UI
- **Rationale**: Vitest is fast, integrates with Vite, covers JS logic; manual UI tests for modals, notifications, table interactions.
- **Alternatives considered**: Cypress, Selenium (rejected for initial MVP due to setup overhead).

## All clarifications resolved. Ready for Phase 1 design.
