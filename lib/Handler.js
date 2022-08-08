import inquirer from "inquirer";
import "dotenv/config";
import cTable from "console.table";
//handles calls from the menu class to parse the user input from questions.json
import Questions from "./Questions.js";
const prompts = new Questions().questions;
import { connection } from '../db/connection.js';
const db = connection;

class Handler {

    constructor() {
    }

    async getInput(request) {
        switch (request) {
            case 'Add Employee':
                return this.addEmployee();
            case 'Add Role':
                return this.addRole();
            case 'Add Department':
                return this.addDepartment();
            case 'View All Employees':
                return this.viewAllEmployees();
            case 'View All Roles':
                return this.viewAllRoles();
            case 'View All Departments':
                return this.viewAllDepartments();
            case 'Update Employee Role':
                return this.updateEmployeeRole();
            case 'View All Managers':
                return this.viewAllManagers();
            case 'Quit':
                console.log("Goodbye!");
                return false;
            default:
                console.log("Goodbye!");
                return false;
        }
    }


    async addEmployee() {
        //response gets the questions.json file which returns a promise

        //override the default value of the manager and role array with values from db
        prompts[2][2].choices = await this.updateRolesList();
        prompts[2][3].choices = await this.updateManagerList();


        await inquirer.prompt(prompts[2]).then(answers => {
            //add answers to db
            let query = `INSERT INTO employee (first_name, last_name, emp_role, manager) VALUES (?, ?, ?, ?)`;
            db.query(query, [answers.first, answers.last, answers.role, answers.manager], (err, res) => {
                if (err) console.log(err);
            });
        })
            .catch(err => {
                console.log("add employee error");
                console.log(err);
            });
        return true;

    }
    async addRole() {

        let depQuery = `SELECT * FROM departments`;
        let depArray = ['Default'];
        const [departments] = await db.query(depQuery);
            //add each role title to the rolesArray
            departments.forEach(department => {
                depArray.push(department.department_name);
            });
        
        prompts[1][2].choices = depArray;

        await inquirer.prompt(prompts[1]).then(answers => {
            let query = `INSERT INTO roles (emp_role, salary, department) VALUES (?, ?, ?)`;
            db.query(query, [answers.role, answers.salary, answers.department], (err, res) => {
                if (err) console.log(err);
            });
        })
            .catch(err => {
                console.log("add role error");
                console.log(err);
            });
        return true;
    }
    async addDepartment() {

        await inquirer.prompt(prompts[0]).then(answers => {
            let query = `INSERT INTO departments (department_name) VALUES (?)`;
            db.query(query, [answers.department], (err, res) => {
                if (err) console.log(err);
            });
        });
        return true;
    }

    async viewAllEmployees() {
        //display all employees from database
        let query = `SELECT * FROM employee`;
        const [employees] = await db.query(query);
        console.clear();
        console.table(employees);
        return true;

    }

    async viewAllRoles() {
        let query = `SELECT * FROM roles`;
        const [roles] = await db.query(query);
        console.clear();
        console.table(roles);
        console.log("Use arrow key to continue...");
        return true;

    }

    async viewAllDepartments() {
        let query = `SELECT * FROM departments`;
        const [departments] = await db.query(query);
        console.clear();
        console.table(departments);
        console.log("Use arrow key to continue...");
        return true;

    }
    async viewAllManagers() {

        //get all employees with manager role from database
        const [managers] = await db.query(`SELECT * FROM employee WHERE emp_role = 'manager'`);
        console.clear();
        console.table(managers);
        console.log("Use arrow key to continue...");
        return true;

    }



    async updateEmployeeRole() {
        let employeeQuery = `SELECT first_name FROM employee`;
        let employeeArray = ['Default'];
        const [employeeName] = await db.query(employeeQuery);
        employeeName.forEach(option => {
            employeeArray.push(option.first_name);

        });
        prompts[4][0].choices = [...employeeArray];


        let chosenEmployee;
        await inquirer.prompt(prompts[4]).then(answers => {
            console.log(answers);
            if (answers.employee == 'Default') {
                console.log("No employee chosen, try again.");
                return false;
            }
            chosenEmployee = answers.option;

        });
        //create query to get employee id
        let employeeIdQuery = `SELECT id FROM employee WHERE first_name = '${chosenEmployee}'`;
        const [employeeId] = await db.query(employeeIdQuery);
        prompts[2][2].choices = await this.updateRolesList();
        prompts[2][3].choices = await this.updateManagerList();



        let updateAnswer;
        await inquirer.prompt(prompts[2]).then(answers => {
            //add answers to db
            updateAnswer = `UPDATE employee SET first_name = '${answers.first}', last_name = '${answers.last}', emp_role = '${answers.role}', manager = '${answers.manager}' WHERE id = ${employeeId[0].id}`;

        })
            .catch(err => {
                console.log("update employee error");
                console.log(err);
            });

        const queryResults = await db.query(updateAnswer);
        // console.log("Employee role updated!");
        // console.log(queryResults);
        return true;


    }

    async updateRolesList() {
        let roleQuery = `SELECT * FROM roles`;
        let rolesArray = ['Default'];
        const [roleRes] = await db.query(roleQuery);
        //add each role title to the rolesArray
        roleRes.forEach(role => {
            if (rolesArray.indexOf(role.emp_role) === -1) {
                rolesArray.push(role.emp_role);
            }
        });
        return rolesArray;

    }


    async updateManagerList() {
        let managerQuery = `SELECT first_name FROM employee WHERE emp_role = 'manager'`;
        let managerArray = ['Default'];

        const [managers] = await db.query(managerQuery);

        //add each role title to the rolesArray
        if (managers.length > 0) {
            managers.forEach(manager => {
                if (managerArray.indexOf(manager.first_name) === -1) {
                    managerArray.push(manager.first_name);
                }
            });
        }
        return managerArray;
    }







}








//export the class
export default Handler;
