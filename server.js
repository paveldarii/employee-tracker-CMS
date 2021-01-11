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
          return console.log("Create New Employee");
        case "Create New Department":
          return console.log("Create New Department");
        case "Create New Role":
          return console.log("Create New Role");
        case "Create New Manager":
          return console.log("Create New Manager");
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return process.exit();
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
          return process.exit();
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
          return process.exit();
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
          return process.exit();
        default:
          console.log("Error from delete function.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function endProcess() {
  return process.exit();
}
function createNewEmployee() {}
function createNewRole() {}
function createNewDepartment() {}
function createNewManager() {}
function retrieveAllEmployees() {}
function retrieveAllRoles() {}
function retrieveAllDepartments() {}
function retrieveAllManagers() {}
function retrieveEmployeesByManagerId() {}
function updateEmployee() {}
function updateManager() {}
function updateRole() {}
function updateDepartment() {}
function deleteEmployee() {}
function deleteManager() {}
function deleteRole() {}
function deleteDepartment() {}
