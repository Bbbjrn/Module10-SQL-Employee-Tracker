import { pool } from './connection.js';
import { QueryResult } from 'pg';

export const getDepartments = async (): Promise<any[]> => {
  const sql = 'SELECT * FROM departments'; 
  const result: QueryResult = await pool.query(sql);
  return result.rows;
};

export const getRoles = async (): Promise<any[]> => {
  const sql = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `;
  const result: QueryResult = await pool.query(sql);
  return result.rows;
};

export const getEmployees = async (): Promise<any[]> => {
  const sql = `
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    JOIN roles r ON e.role_id = r.id
    JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id
  `;
  const result: QueryResult = await pool.query(sql);
  return result.rows;
};

export const addDepartment = async (name: string): Promise<void> => {
  const sql = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
  const result: QueryResult = await pool.query(sql, [name]);
  console.log(`Added ${result.rows[0].name} to the database.`);
};

export const addRole = async (title: string, salary: number, department_id: number): Promise<void> => {
  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
  const result: QueryResult = await pool.query(sql, [title, salary, department_id]);
  console.log(`Added ${result.rows[0].title} to the database.`);
};

export const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: number | null): Promise<void> => {
  const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
  const result: QueryResult = await pool.query(sql, [first_name, last_name, role_id, manager_id]);
  console.log(`Added ${result.rows[0].first_name} ${result.rows[0].last_name} to the database.`);
};

export const updateEmployeeRole = async (employee_id: number, role_id: number): Promise<void> => {
  const sql = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
  const result: QueryResult = await pool.query(sql, [role_id, employee_id]);
  console.log(`Updated ${result.rows[0].first_name} ${result.rows[0].last_name}'s role.`);
};
