import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/new-department', async (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
    const params = [name];

    try {
        const result: QueryResult = await pool.query(sql, params);
        res.json({
            message: 'Department added',
            data: result.rows[0],
        }); 
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/departments', async (_req, res) => {
    const sql = 'SELECT id, name from departments';

    try{
        const result: QueryResult = await pool.query(sql);
        res.json({
            message: 'Departments returned',
            data: result.rows,
        });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
});

app.post('/api/new-role', async (req, res) => {
    const { title, salary, department_id } = req.body;
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const params = [title, salary, department_id];

    try {
        const result: QueryResult = await pool.query(sql, params);
        res.json({
            message: 'Role added',
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/roles', async (_req, res) => {
    const sql = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `;

  try {
    const results: QueryResult = await pool.query(sql);
    res.json({
        message: 'Roles returned',
        data: results.rows,
    });    
  } catch (err: any) {
      res.status(500).json({ error: err.message });
  }
});

app.post('/api/new-employee', async (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const params = [first_name, last_name, role_id, manager_id];

    try {
        const result: QueryResult = await pool.query(sql, params);
        res.json({
            message: 'Employee added',
            data: result.rows[0],
        });    
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/employees', async (_req, res) => {
    const sql = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, roles.salary, departments.name AS department, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `;

    try {
        const results: QueryResult = await pool.query(sql);
        res.json({
            message: 'Employees returned',
            data: results.rows,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/employee/:id', async (req, res) => { 
    const { role_id } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
    const params = [role_id, id];

    try {
        const result: QueryResult = await pool.query(sql, params);
        if (!result.rowCount) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.json({
                message: 'Employee updated',
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/department/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM departments WHERE id = $1';
    const params = [id];

    try {
        const result: QueryResult = await pool.query(sql, params);
        if (!result.rowCount) {
            res.status(404).json({ message: 'Department not found' });
        } else {
            res.json({ 
                message: 'Department deleted'
                changes: result.rowCount,
                id, 
            });
        }
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});