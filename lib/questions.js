const questions = [
    [
        {
            "type": "input",
            "name": "department",
            "message": "Enter name of department."
        }
    ],
    [
        {
            "type": "input",
            "name": "role",
            "message": "Enter name of the role."
        },
        {
            "type": "input",
            "name": "salary",
            "message": "Enter the salary for the role."
        },
        {
            "type": "list",
            "name": "department",
            "message": "Enter which department to place the new role.",
            "choices": [
                "Default"
            ]
        }
    ],
    [
        {
            "type": "input",
            "name": "first",
            "message": "Enter the first name of the employee."
        },
        {
            "type": "input",
            "name": "last",
            "message": "Enter the last name of the employee."
        },
        {
            "type": "list",
            "name": "role",
            "message": "Pick the role of the employee.",
            "choices": [
                "Default"
            ]
        },
        {
            "type": "list",
            "name": "manager",
            "message": "Pick the manager of the employee.",
            "choices": [
                "Default"
            ]
        }
    ],
    [
        {
            "type": "list",
            "name": "option",
            "message": "What would you like to do?",
            "choices": [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "View All Managers",
                "Quit"
            ]
        }
    ]
]

export default questions;