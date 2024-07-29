<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("employeesid", $_GET)) {
  // get data
  $employees->employees_aid = $_GET['employeesid'];
  checkId($employees->employees_aid);


  $query = checkDelete($employees);

  returnSuccess($employees, "employees", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
