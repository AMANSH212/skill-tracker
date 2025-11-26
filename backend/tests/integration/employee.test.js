// backend/tests/integration/employee.test.js
const request = require('supertest');
const express = require('express');
const employeeRouter = require('../../src/api/employee');
const app = express();
app.use(express.json());
app.use('/api/employees', employeeRouter);

describe('Employee API', () => {
  it('should create, update, and delete an employee', async () => {
    // Create
    let res = await request(app)
      .post('/api/employees')
      .send({ name: 'Test', role: 'Dev', last_updated: '2025-11-26' });
    expect(res.statusCode).toBe(201);
    const id = res.body.id;

    // Update
    res = await request(app)
      .put(`/api/employees/${id}`)
      .send({ name: 'Test Updated', role: 'QA', last_updated: '2025-11-26' });
    expect(res.statusCode).toBe(200);

    // Delete
    res = await request(app)
      .delete(`/api/employees/${id}`);
    expect(res.statusCode).toBe(200);
  });
});
