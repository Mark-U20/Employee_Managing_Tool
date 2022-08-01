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
        if (request === 'Add Employee') {
            return await this.addEmployee();
        }
        else if (request === 'Add Role') {
            return await this.addRole();
        }
        else if (request === 'Add Department') {
            return await this.addDepartment();
        }
        else if (request === 'View All Employees') {
            return await this.viewAllEmployees();
        }
        else if (request === 'View All Roles') {
            return await this.viewAllRoles();
        }
        else if (request === 'View All Departments') {
            return await this.viewAllDepartments();
        }
        else if (request === 'Update Employee Role') {
            return await this.updateEmployeeRole();
        }
        else if (request === 'View All Managers') {
            return await this.viewAllManagers();
        }
        else {
            console.log("Goodbye!");
            return false;
        }

    }


    async addEmployee() {
        //response gets the questions.json file which returns a promise
        let roleQuery = `SELECT * FROM roles`;
        let managerQuery = `SELECT first_name FROM employee WHERE emp_role = 'manager'`;
        let managerArray = ['Default'];
        let rolesArray = ['Default'];
        const [roleRes] = await db.query(roleQuery);
        //add each role title to the rolesArray
        roleRes.forEach(role => {
            if (rolesArray.indexOf(role.emp_role) === -1) {
                rolesArray.push(role.emp_role);
            }
        });


        const [managers] = await db.query(managerQuery);

        //add each role title to the rolesArray
        if (managers.length > 0) {
            managers.forEach(manager => {
                if (managerArray.indexOf(manager.first_name) === -1) {
                    managerArray.push(manager.first_name);
                }
            });
        }

        //override the default value of the manager and role array with values from db
        prompts[2][2].choices = rolesArray;
        prompts[2][3].choices = managerArray;
        // console.log(prompts[2][2].choices);
        // console.log("prompts[2][3].choices");
        // console.log(prompts[2][3].choices);

        await inquirer.prompt(prompts[2]).then(answers => {
            console.log(answers);
            //add answers to db
            let query = `INSERT INTO employee (first_name, last_name, emp_role, manager) VALUES (?, ?, ?, ?)`;
            db.query(query, [answers.first, answers.last, answers.role, answers.manager], (err, res) => {
                if (err) console.log(err);
            });
            console.log("end of query");
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
        db.query(depQuery, (err, res) => {
            //add each role title to the rolesArray
            res.forEach(department => {
                depArray.push(department.department_name);
            });
        });
        prompts[1][2].choices = depArray;

        await inquirer.prompt(prompts[1]).then(answers => {
            let query = `INSERT INTO roles (emp_role, salary, department) VALUES (?, ?, ?)`;
            db.query(query, [answers.role, answers.salary, answers.department], (err, res) => {
                if (err) console.log(err);
            });
            console.log("end of query");
            console.log(answers);
        })
            .catch(err => {
                console.log("add role error");
                console.log(err);
            });
        return true;
    }
    async addDepartment() {




        const department = await inquirer.prompt(prompts[0]).then(answers => {

            let query = `INSERT INTO departments (department_name) VALUES (?)`;
            db.query(query, [answers.department], (err, res) => {
                if (err) console.log(err);
            });
            console.log("end of query");
            console.log(answers);

            //logic to add employee to db
            return true;
        });
        return department;
    }
    async viewAllEmployees() {
        //display all employees from database
        let query = `SELECT * FROM employee`;
        db.query(query, (err, res) => {
            if (err) console.log(err);
            console.clear();
            console.table(res);
            console.log("Use arrow key to continue...");
        });
        console.clear();
        return true;

    }

    async viewAllRoles() {
        let query = `SELECT * FROM roles`;
        db.query(query, (err, res) => {
            if (err) console.log(err);
            console.clear();
            console.table(res);
            console.log("Use arrow key to continue...");
        });
        console.clear();
        return true;

    }

    async viewAllDepartments() {
        let query = `SELECT * FROM departments`;
        db.query(query, (err, res) => {
            if (err) console.log(err);
            console.clear();
            console.table(res);
            console.log("Use arrow key to continue...");
        });
        console.clear();
        return true;

    }
    async viewAllManagers() {

        //get all employees with manager role from database
        db.query(`SELECT * FROM employee WHERE emp_role = 'manager'`, (err, res) => {
            if (err) console.log(err);
            console.clear();
            console.table(res);
            console.log("Use arrow key to continue...");
        });


    }



    async updateEmployeeRole() {
        let employeeQuery = `SELECT first_name FROM employee`;
        let employeeArray = ['Default'];
         const [employeeName] = await db.query(employeeQuery);
            employeeName.forEach(option => {
                employeeArray.push(option.first_name);

            });
            prompts[4][0].choices = [...employeeArray];
        

        await inquirer.prompt(prompts[4]).then(answers => {
            console.log(answers);
            if (answers.employee == 'Default') {
                console.log("No employee chosen, try again.");
                return false;
            }
            // let chosenEmployee;
            // db.query(`SELECT id FROM employee WHERE last_name = '${answers.split(" ")[1]}'`, (err, res) => {
            //     if (err) console.log(err);
            //     console.log(res);
            //     chosenEmployee = res[0].id;
            // });
        });

    }






}

//export the class
export default Handler;
