// backend/tests/integration/filter.test.js
const request = require('supertest');
const express = require('express');
const employeeRouter = require('../../src/api/employee');
const app = express();
app.use(express.json());
app.use('/api/employees', employeeRouter);

describe('Employee API Search/Filter/Sort/Pagination', () => {
  it('should filter, sort, and paginate employees', async () => {
    // Add employees
    await request(app).post('/api/employees').send({ name: 'Alice', role: 'Dev', last_updated: '2025-11-26' });
    await request(app).post('/api/employees').send({ name: 'Bob', role: 'QA', last_updated: '2025-11-25' });
    await request(app).post('/api/employees').send({ name: 'Charlie', role: 'Dev', last_updated: '2025-11-24' });

    // Search by keyword
    let res = await request(app).get('/api/employees/search?keyword=Dev');
    expect(res.body.length).toBeGreaterThan(0);

    // Sort by name
    res = await request(app).get('/api/employees/search?sort=name');
    expect(res.body[0].name).toBe('Alice');

    // Paginate
    res = await request(app).get('/api/employees/search?page=1&pageSize=2');
    expect(res.body.length).toBe(2);
  });
});
