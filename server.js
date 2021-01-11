var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

inquirer
  .prompt([])
  .then((answers) => {})
  .catch((error) => {
    console.log(error);
  });
