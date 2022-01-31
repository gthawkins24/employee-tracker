const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'employee_db'
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw (err);
    firstPrompt();
})

const firstPrompt = async () => {
    try {
        let promptAnswer = await inquirer.prompt({
            name: 'selections',
            type: 'list',
            message: 'What would you like to do?',
            pageSize: 10,
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add an Employee',
                'Update an Employee Role',
                'Add a Role',
                'Exit'
            ]
        });
        switch(promptAnswer.selections) {
            case 'View All Departments':
                viewDepartments();
                break;

            case 'View All Roles':
                viewRoles();
                break;

            case 'View All Employees':
                viewEmployees();
                break;

            case 'Add a Department':
                addDepartment();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Update an Employee Role':
                updateEmployee();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'Exit':
                connection.end();
                break;
        };
    } catch (err) {
        console.log(err);
        firstPrompt();
    };
};

const viewDepartments = async () => {
    console.log('Departments:');
    try {
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            departmentsArray = [];
            res.forEach(department => departmentsArray.push(department));
            console.table(departmentsArray);
            firstPrompt();
        });
    } catch (err) {
        console.log(err);
        firstPrompt();
    };
};

const viewRoles = async () => {
    console.log('Roles:');
    try {
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw (err);
            let rolesArray = [];
            res.forEach(role => rolesArray.push(role));
            console.table(rolesArray);
            firstPrompt();
        });
    } catch (err) {
        console.log(err);
        firstPrompt();
    }
};

const viewEmployees = async () => {
    console.log('Employees:');
    try {
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeesArray = [];
            res.forEach(employee => employeesArray.push(employee));
            console.table(employeesArray);
            firstPrompt();
        });
    } catch (err) {
        console.log(err);
        firstPrompt();
    }
};

const addEmployee = async () => {
    try {
        console.log('Adding Employee:');

        let roles = await connection.query('SELECT * FROM role');

        let managers = await connection.query('SELECT * FROM employee');

        let input = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the employee?'
            },
            {
                name: 'employeeID',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: 'What is the role ID of the employee?'
            },
            {
                name: 'managerID',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id
                    }
                }),
                message: 'What is the manager ID of the employee?'
            }
        ])

        connection.query('INSERT INTO employee SET ?', {
            first_name: input.firstName,
            last_name: input.lastName,
            role_id: (input.employeeID),
            manager_id: (input.managerID)
        });

        console.log('Employee added!');
        firstPrompt();

    } catch (err) {
        console.log(err);
        firstPrompt();
    }
};

const addDepartment = async () => {
    try {
        console.log('Adding Deparment:')

        let input = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'input',
                message:'What is the department name?'
            }
        ]);

        connection.query('INSERT INTO department SET?', {
            department_name: input.departmentName
        });

        console.log('Department added!');
        firstPrompt();

    } catch (err) {
        console.log(err);
        firstPrompt()
    }
};

const updateEmployee = async () => {
    try {
        console.log('Updating Employee:');

        let employees = await connection.query('SELECT * FROM employee');

        let employeeInput = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                }),
                message: 'Which employee to update?'
            }
        ]);

        let roles = await connection.query('SELECT * FROM role');

        let rolesSelect = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: 'Select the new employee role.'
            }
        ]);

        connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: rolesSelect.role }, { id: employeeInput.employee }]);

        console.log('Employee updated!');
        firstPrompt();

    } catch (err) {
        console.log(err);
        firstPrompt();
    }
}

const addRole = async () => {
    try {
        console.log('Adding role:');

        let departments = await connection.query('SELECT * FROM department');

        let input = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the new role.'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for this role.'
            },
            {
                name: 'department',
                type: 'list',
                choices: departments.map((department) => {
                    return {
                        name: department.department_name,
                        value: department.id
                    }
                }),
                message: 'Select the department for this role.'
            }
        ]);

        let inputDepartment;
        for (i = 0; i < departments.length; i++) {
            if (departments[i].department_id === input.choice) {
                inputDepartment = departments[i];
            };
        }

        connection.query('INSERT INTO role SET ?', {
            title: input.title,
            salary: input.salary,
            department_id: input.department
        })

        console.log('Role added!');
        firstPrompt();
    } catch (err) {
        console.log(err);
        firstPrompt();
    }
};