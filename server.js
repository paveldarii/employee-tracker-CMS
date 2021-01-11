var mysql = require("mysql");
var inquirer = require("inquirer");
const DBName = "employeeDB";
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: DBName,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptMainMenu();
});

function promptMainMenu() {
  inquirer
    .prompt([
      {
        name: "toDo",
        type: "list",
        message: `You are currently in ${DBName} database main menu.\n  What action do you intend to perform?`,
        choices: ["Create", "Retrieve", "Update", "Delete", "Exit"],
      },
    ])
    .then((answer) => {
      switch (answer.toDo) {
        case "Create":
          return promptOptionsForCreate();
        case "Retrieve":
          return promptOptionsForRetrieve();
        case "Update":
          return promptOptionsForUpdate();
        case "Delete":
          return promptOptionsForDelete();
        case "Exit":
          return endProcess();
        default:
          console.log("Error from main prompt");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function promptOptionsForCreate() {
  inquirer
    .prompt([
      {
        name: "toCreate",
        type: "list",
        message: "What do you want to create?",
        choices: [
          "Create New Employee",
          "Create New Department",
          "Create New Role",
          "Create New Manager",
          "Return to Main Menu",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.toCreate) {
        case "Create New Employee":
          promptToCreateNewEmployee().then((response) => {
            console.log(response);
            promptMainMenu();
          });
          return;
        case "Create New Department":
          return promptToCreateNewDepartment().then((response) => {
            console.log(response);
            promptMainMenu();
          });
        case "Create New Role":
          return promptToCreateNewRole().then((response) => {
            console.log(response);
            promptMainMenu();
          });
        case "Create New Manager":
          return promptToCreateNewEmployee().then((response) => {
            console.log(response);
            promptMainMenu();
          });
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return endProcess();
        default:
          console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function promptOptionsForRetrieve() {
  inquirer
    .prompt([
      {
        name: "toRetrieve",
        type: "list",
        message: "What do you want to create?",
        choices: [
          "Retrieve All Employees",
          "Retrieve All Departments",
          "Retrieve All Roles",
          "Retrieve All Managers",
          "Retrieve All Employees by Manager Id",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.toRetrieve) {
        case "Retrieve All Employees":
          return console.log("Create New Employee");
        case "Retrieve All Departments":
          return console.log("Create New Department");
        case "Retrieve All Roles":
          return console.log("Create New Role");
        case "Retrieve All Managers":
          return console.log("Create New Manager");
        case "Retrieve All Employees by Manager Id":
          return console.log("Retrieve All Employees by Manager Id");
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return endProcess();
        default:
          console.log("error from retrieve function");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function promptOptionsForUpdate() {
  inquirer
    .prompt([
      {
        name: "toUpdate",
        type: "list",
        message: "What do you want to Update?",
        choices: [
          "Update an Employee",
          "Update a Department",
          "Update a Role",
          "Update a Manager",
          "Return to main menu",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.toRetrieve) {
        case "Update an Employee":
          return console.log("Update an Employee");
        case "Update a Department":
          return console.log("Update a Department");
        case "Update a Role":
          return console.log("Update a Roles");
        case "Update a Manager":
          return console.log("Update a Manager");
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return endProcess();
        default:
          console.log("Error from retrieve function");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function promptOptionsForDelete() {
  inquirer
    .prompt([
      {
        name: "toDelete",
        type: "list",
        message: "What do you want to Update?",
        choices: [
          "Delete an Employee",
          "Delete a Department",
          "Delete a Roles",
          "Delete a Manager",
          "Return to main menu",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.toDelete) {
        case "Delete an Employee":
          return console.log("Update an Employee");
        case "Delete a Department":
          return console.log("Update a Department");
        case "Delete a Roles":
          return console.log("Update a Roles");
        case "Delete a Manager":
          return console.log("Update a Manager");
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return endProcess();
        default:
          console.log("Error from delete function.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function endProcess() {
  console.log("\nBye!\n");
  return process.exit();
}
function promptToCreateNewEmployee() {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "input",
      name: "managerId",
      message: "What is Employee's manager Id",
    },
    {
      type: "input",
      name: "roleId",
      message: "What is Employee's role Id",
    },
  ]);
}
function promptToCreateNewRole() {
  return inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the role that you want to add to the database?",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the role's salary?",
    },
    {
      type: "input",
      name: "departmentId",
      message: "What is the departmentId?",
    },
  ]);
}
function promptToCreateNewDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the department name?",
    },
  ]);
}
function promptToCreateNewManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the manager's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the manager's lastName name?",
    },
  ]);
}
function retrieveAllEmployees() {}
function retrieveAllRoles() {}
function retrieveAllDepartments() {}
function retrieveAllManagers() {}
function retrieveEmployeesByManagerId() {}
function promptToUpdateEmployee() {}
function promptToUpdateManager() {}
function promptToUpdateRole() {}
function promptToUpdateDepartment() {}
function promptToDeleteEmployee() {}
function promptToDeleteManager() {}
function promptToDeleteRole() {}
function promptToDeleteDepartment() {}
