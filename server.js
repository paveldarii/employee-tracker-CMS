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
        choices: ["Create", "Retrieve", "Update", "Delete"],
      },
    ])
    .then((answer) => {
      switch (answer.toDo) {
        case "Create":
          return console.log("Create");
        case "Retrieve":
          return console.log("Retrieve");
        case "Update":
          return console.log("Update");
        case "Delete":
          return console.log("Delete");
        default:
          console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
