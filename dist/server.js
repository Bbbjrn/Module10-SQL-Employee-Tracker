"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeRole = exports.addEmployee = exports.addRole = exports.addDepartment = exports.getEmployees = exports.getRoles = exports.getDepartments = void 0;
const connection_js_1 = require("./connection.js");
const getDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM departments';
    const result = yield connection_js_1.pool.query(sql);
    return result.rows;
});
exports.getDepartments = getDepartments;
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
  `;
    const result = yield connection_js_1.pool.query(sql);
    return result.rows;
});
exports.getRoles = getRoles;
const getEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    JOIN roles r ON e.role_id = r.id
    JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id
  `;
    const result = yield connection_js_1.pool.query(sql);
    return result.rows;
});
exports.getEmployees = getEmployees;
const addDepartment = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO departments (name) VALUES ($1) RETURNING *';
    const result = yield connection_js_1.pool.query(sql, [name]);
    console.log(`Added ${result.rows[0].name} to the database.`);
});
exports.addDepartment = addDepartment;
const addRole = (title, salary, department_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const result = yield connection_js_1.pool.query(sql, [title, salary, department_id]);
    console.log(`Added ${result.rows[0].title} to the database.`);
});
exports.addRole = addRole;
const addEmployee = (first_name, last_name, role_id, manager_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = yield connection_js_1.pool.query(sql, [first_name, last_name, role_id, manager_id]);
    console.log(`Added ${result.rows[0].first_name} ${result.rows[0].last_name} to the database.`);
});
exports.addEmployee = addEmployee;
const updateEmployeeRole = (employee_id, role_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *';
    const result = yield connection_js_1.pool.query(sql, [role_id, employee_id]);
    console.log(`Updated ${result.rows[0].first_name} ${result.rows[0].last_name}'s role.`);
});
exports.updateEmployeeRole = updateEmployeeRole;
//# sourceMappingURL=server.js.map