import inquirer from "inquirer";
//handles calls from the menu class to parse the user input from questions.json
const questions = import('./questions.js');
const response = await questions;
const prompts = response.default;
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

    }

    async addEmployee() {
        //response gets the questions.json file which returns a promise
        const employee = await inquirer.prompt(prompts[2]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return employee;
    }
    async addRole() {
        const role = await inquirer.prompt(prompts[1]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return role;
    }
    async addDepartment() {
        const department = await inquirer.prompt(prompts[0]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return department;
    }
    async viewAllEmployees() {
        const employees = await inquirer.prompt(prompts[3]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return employees;
    }

    async viewAllRoles() {
        const roles = await inquirer.prompt(prompts[4]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return roles;
    }

    async viewAllDepartments() {
        const departments = await inquirer.prompt(prompts[5]).then(answers => {
            console.log(answers);
            //logic to add employee to db
            return answers;
        });
        return departments;
    }

    async updateEmployeeRole() {
      
        //prompt use to pick employee from list
        //retrieve employee data from db
        //




        return employeeRole;
    }



}

//export the class
export default Handler;
