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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const server_js_1 = require("./server.js");
const connection_js_1 = require("./connection.js");
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield inquirer_1.default.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add department',
            'View all roles',
            'Add role',
            'View all employees',
            'Add employee',
            'Update employee role',
            'Exit',
        ],
    });
    switch (answer.action) {
        case 'View all departments':
            const departments = yield (0, server_js_1.getDepartments)();
            console.table(departments);
            break;
        case 'Add department':
            yield promptAddDepartment();
            break;
        case 'View all roles':
            const roles = yield (0, server_js_1.getRoles)();
            console.table(roles);
            break;
        case 'Add role':
            yield promptAddRole();
            break;
        case 'View all employees':
            const employees = yield (0, server_js_1.getEmployees)();
            console.table(employees);
            break;
        case 'Add employee':
            yield promptAddEmployee();
            break;
        case 'Update employee role':
            yield promptUpdateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    mainMenu();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_js_1.connectToDb)();
    yield mainMenu();
}))();
const promptAddDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield inquirer_1.default.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
    });
    yield (0, server_js_1.addDepartment)(answer.name);
});
const promptAddRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield (0, server_js_1.getDepartments)();
    const answer = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department does the role belong to?',
            choices: departments.map(dept => ({ name: dept.name, value: dept.id })),
        },
    ]);
    yield (0, server_js_1.addRole)(answer.title, parseFloat(answer.salary), answer.department_id);
});
const promptAddEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield (0, server_js_1.getRoles)();
    const employees = yield (0, server_js_1.getEmployees)();
    const answer = yield inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))],
        },
    ]);
    yield (0, server_js_1.addEmployee)(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
});
const promptUpdateEmployeeRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, server_js_1.getEmployees)();
    const roles = yield (0, server_js_1.getRoles)();
    const answer = yield inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "Which employee's role do you want to update?",
            choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role do you want to assign the selected employee?',
            choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
    ]);
    yield (0, server_js_1.updateEmployeeRole)(answer.employee_id, answer.role_id);
});
//# sourceMappingURL=index.js.map