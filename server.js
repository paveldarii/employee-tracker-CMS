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
function askToPromptMainMenu() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "isContinuing",
        message: "Do you want to perform another action?",
      },
    ])
    .then((answer) => {
      if (answer.isContinuing) {
        promptMainMenu();
      } else {
        endProcess();
      }
    });
}
function promptMainMenu() {
  inquirer
    .prompt([
      {
        name: "toDo",
        type: "list",
        message: `\nYou are currently in ${DBName} database main menu.\n  What action do you intend to perform?`,
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
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.roleId,
                manager_id: response.managerId,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  "\nSuccess: " + res.affectedRows + " employee inserted!\n"
                );
                askToPromptMainMenu();
              }
            );
          });
          return;
        case "Create New Department":
          return promptToCreateNewDepartment().then((response) => {
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: response.newDepartment,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  "\n Success: " + res.affectedRows + " department inserted!\n"
                );
                askToPromptMainMenu();
              }
            );
          });
        case "Create New Role":
          return promptToCreateNewRole().then((response) => {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: response.newRole,
                salary_usd: response.roleSalary,
                department_id: response.departmentId,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  "\nSuccess: " + res.affectedRows + " employee inserted!\n"
                );
                askToPromptMainMenu();
              }
            );
          });
        case "Create New Manager":
          return promptToCreateNewManager().then((response) => {
            connection.query(
              "INSERT INTO manager SET ?",
              {
                first_name: response.firstName,
                last_name: response.lastName,
              },
              function (err, res) {
                if (err) throw err;
                console.log(
                  "\nSuccess: " + res.affectedRows + " manager inserted!\n"
                );
                askToPromptMainMenu();
              }
            );
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
          return retrieveAllEmployees();
        case "Retrieve All Departments":
          return retrieveAllDepartments();
        case "Retrieve All Roles":
          return retrieveAllRoles();
        case "Retrieve All Managers":
          return retrieveAllManagers();
        case "Retrieve All Employees by Manager Id":
          return retrieveEmployeesByManagerId();
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
      switch (answer.toUpdate) {
        case "Update an Employee":
          return promptToUpdateEmployee().then((answer) => {
            switch (answer.fieldToUpdate) {
              case "first_name":
                return connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.employeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " employee's first name updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "last_name":
                return connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.employeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " employee's last name updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "role_id":
                return connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.employeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " employee's role id updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "manager_id":
                return connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.employeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " employee's manager id updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              default:
                console.log("Error from update employee function callback!");
            }
          });
        case "Update a Department":
          return promptToUpdateDepartment().then((answer) => {
            switch (answer.fieldToUpdate) {
              case "name":
                return connection.query(
                  "UPDATE department SET ? WHERE ?",
                  [
                    {
                      name: answer.contentToUpdate,
                    },
                    {
                      id: answer.departmentId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " department's name updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              default:
                console.log("Error from update department function callback!");
            }
          });
        case "Update a Role":
          return promptToUpdateRole().then((answer) => {
            switch (answer.fieldToUpdate) {
              case "title":
                return connection.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      title: answer.contentToUpdate,
                    },
                    {
                      id: answer.roleId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " role's title updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "salary_usd":
                return connection.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      salary_usd: answer.contentToUpdate,
                    },
                    {
                      id: answer.roleId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " role's salary updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "department_id":
                return connection.query(
                  "UPDATE role SET ? WHERE ?",
                  [
                    {
                      department_id: answer.contentToUpdate,
                    },
                    {
                      id: answer.employeeId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " role's department_id updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              default:
                console.log("Error from update role function callback!");
            }
          });
        case "Update a Manager":
          return promptToUpdateManager().then((answer) => {
            switch (answer.fieldToUpdate) {
              case "first_name":
                return connection.query(
                  "UPDATE manager SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.managerId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " manager's first name updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
              case "last_name":
                return connection.query(
                  "UPDATE manager SET ? WHERE ?",
                  [
                    {
                      first_name: answer.contentToUpdate,
                    },
                    {
                      id: answer.managerId,
                    },
                  ],
                  function (err, res) {
                    if (err) throw err;
                    console.log(
                      "Success: " +
                        res.affectedRows +
                        " managers's last name updated!\n"
                    );
                    askToPromptMainMenu();
                  }
                );
            }
          });
        case "Return to Main Menu":
          return promptMainMenu();
        case "Exit":
          return endProcess();
        default:
          console.log("Error from promptOptionsToUpdate function");
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
          return promptToDeleteEmployee().then((answer) => {
            deleteRow(answer.id, "employee");
            askToPromptMainMenu();
          });
        case "Delete a Department":
          return promptToDeleteDepartment().then((answer) => {
            deleteRow(answer.id, "department");
            askToPromptMainMenu();
          });
        case "Delete a Roles":
          return promptToDeleteRole().then((answer) => {
            deleteRow(answer.id, "role");
            askToPromptMainMenu();
          });
        case "Delete a Manager":
          return promptToDeleteManager().then((answer) => {
            deleteRow(answer.id, "manager");
            askToPromptMainMenu();
          });
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
  console.log("\n  Bye!\n");
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
function retrieveAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    askToPromptMainMenu();
  });
}
function retrieveAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    askToPromptMainMenu();
  });
}
function retrieveAllDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    askToPromptMainMenu();
  });
}
function retrieveAllManagers() {
  connection.query("SELECT * FROM manager", function (err, res) {
    if (err) throw err;
    console.table(res);
    askToPromptMainMenu();
  });
}
function retrieveEmployeesByManagerId() {}
function promptToUpdateEmployee() {
  return inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "What is the employee's id that you want to update?",
    },
    {
      name: "fieldToUpdate",
      type: "list",
      message: "What do you want to update?",
      choices: ["first_name", "last_name", "role_id", "manager_id"],
    },
    {
      type: "input",
      name: "contentToUpdate",
      message: "Insert new content for the field you just chose?",
    },
  ]);
}
function promptToUpdateManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "managerId",
      message: "What is the manager's id that you want to update?",
    },
    {
      name: "fieldToUpdate",
      type: "list",
      message: "What do you want to update?",
      choices: ["first_name", "last_name"],
    },
    {
      type: "input",
      name: "contentToUpdate",
      message: "Insert new content for the field you just chose?",
    },
  ]);
}
function promptToUpdateRole() {
  return inquirer.prompt([
    {
      type: "input",
      name: "roleId",
      message: "What is the role's id that you want to update?",
    },
    {
      name: "fieldToUpdate",
      type: "list",
      message: "What do you want to update?",
      choices: ["title", "salary_usd", "department_id"],
    },
    {
      type: "input",
      name: "contentToUpdate",
      message: "Insert new content for the field you just chose?",
    },
  ]);
}
function promptToUpdateDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "departmentId",
      message: "What is the department's id that you want to update?",
    },
    {
      name: "fieldToUpdate",
      type: "list",
      message: "What do you want to update?",
      choices: ["name"],
    },
    {
      type: "input",
      name: "contentToUpdate",
      message: "Insert new content for the field you just chose?",
    },
  ]);
}
function promptToDeleteEmployee() {
  return inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the employee's id that you want to delete?",
    },
  ]);
}
function promptToDeleteManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the manager's id that you want to delete?",
    },
  ]);
}
function promptToDeleteRole() {
  return inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the role's id that you want to delete?",
    },
  ]);
}
function promptToDeleteDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the department's id that you want to delete?",
    },
  ]);
}
function deleteRow(insertedId, tableName) {
  connection.query(
    `DELETE FROM ${tableName} WHERE ?`,
    {
      id: insertedId,
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
    }
  );
}
