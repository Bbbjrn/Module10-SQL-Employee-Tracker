# Module10-SQL-Employee-Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

The Employee Tracker is a command-line application designed to manage a company's employee database. It allows users to view and manage departments, roles, and employees, providing a comprehensive interface for business owners to organize and plan their operations. This application uses Node.js, Inquirer for interactive prompts, and PostgreSQL as the database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Bbbjrn/Module10-SQL-Employee-Tracker.git
    cd Module10-SQL-Employee-Tracker
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up PostgreSQL and the database**:
    - Ensure PostgreSQL is installed and running.
    - Create a PostgreSQL database and run the `schema.sql` and `seeds.sql` files to set up the database structure and populate it with initial data:
    ```sh
    psql -U your_username -d company_db -f schema.sql
    psql -U your_username -d company_db -f seeds.sql
    ```

4. **Configure environment variables**:
    - Create a `.env` file in the root directory and add your PostgreSQL connection details:
    ```sh
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_HOST=localhost
    DB_DATABASE=company_db
    DB_PORT=5432
    ```

5. **Build the project**:
    ```sh
    npm run build
    ```

6. **Start the application**:
    ```sh
    npm start
    ```

## Usage

### Managing Employees, Departments, and Roles

- **View Departments**: View a list of all company departments, including department names and IDs.
- **View Roles**: View job roles with details such as title, department, salary, and role ID.
- **View Employees**: Get a comprehensive list of all employees, including their IDs, names, roles, departments, salaries, and managers.
- **Add Departments**: Create new departments by specifying their name.
- **Add Roles**: Define new job roles by providing a title, salary, and associated department.
- **Add Employees**: Add new employees to the database by providing their first name, last name, role, and manager.
- **Update Employee Roles**: Update an existing employee's role in the company.

### CLI Workflow

1. Start the application by running `npm start`.
2. Navigate the interactive menu to manage departments, roles, and employees.
3. Follow prompts for actions like adding, viewing, and updating records in the database.

## Features

- **Employee Management**: Easily add, view, and update employees and their roles within the company.
- **Department and Role Management**: View and manage departments and roles, with options to add new departments and roles.
- **PostgreSQL Integration**: Data is stored and managed using a relational database for secure and efficient data management.
- **Interactive CLI**: The user-friendly command-line interface makes it easy for business owners to manage their data without requiring advanced technical knowledge.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Author**: Bjorn Johansson

**GitHub**: [Bbbjrn](https://github.com/your-username)


