import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

export const getDepartments = async () => {
    const result: QueryResult = await pool.query('SELECT * FROM department');
    return result.rows;
};

export const addDepartment = async (name: string) => {
    const result: QueryResult = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    console.log(`Added ${result.rows[0].name} to the database.`);
};

export const getRoles = async () => {
    const result: QueryResult = await pool.query('SELECT * FROM role');
    return result.rows;
};

export const addRole = async (title: string, salary: number, departmentId: number) => {
    const result: QueryResult = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    console.log(`Added ${result.rows[0].title} to the database.`);
};

export const getEmployees = async () => {
    const result: QueryResult = await pool.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `);
    return result.rows;
};

export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
    const result: QueryResult = await pool.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, roleId, managerId]
    );
    console.log(`Added ${result.rows[0].first_name} ${result.rows[0].last_name} to the database.`);
};

export const updateEmployeeRole = async (employee_id: number, role_id: number) => {
    const result: QueryResult = await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, employee_id]
    );
    console.log(`Updated ${result.rows[0].first_name} ${result.rows[0].last_name}'s role in the database.`);
};
    