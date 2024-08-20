import inquirer from 'inquirer';
import { getDepartments, addDepartment, getRoles, addRole, getEmployees, addEmployee, updateEmployeeRole } from './server.js';
import { connectToDb } from './connection.js';


const mainMenu = async () => {
  const answer = await inquirer.prompt({
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
      const departments = await getDepartments();
      console.table(departments);
      break;
    case 'Add department':
      await promptAddDepartment();
      break;
    case 'View all roles':
      const roles = await getRoles();
      console.table(roles);
      break;
    case 'Add role':
      await promptAddRole();
      break;
    case 'View all employees':
      const employees = await getEmployees();
      console.table(employees);
      break;
    case 'Add employee':
      await promptAddEmployee();
      break;
    case 'Update employee role':
      await promptUpdateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  mainMenu(); 
};

(async () => {
    await connectToDb();
    await mainMenu();
  })();
  

const promptAddDepartment = async () => {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?',
  });
  await addDepartment(answer.name);
};

const promptAddRole = async () => {
  const departments = await getDepartments();
  const answer = await inquirer.prompt([
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
  await addRole(answer.title, parseFloat(answer.salary), answer.department_id);
};

const promptAddEmployee = async () => {
  const roles = await getRoles();
  const employees = await getEmployees();
  const answer = await inquirer.prompt([
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
  await addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
};

const promptUpdateEmployeeRole = async () => {
  const employees = await getEmployees();
  const roles = await getRoles();
  const answer = await inquirer.prompt([
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
  await updateEmployeeRole(answer.employee_id, answer.role_id);
};

