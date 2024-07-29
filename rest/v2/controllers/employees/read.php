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
  $employees->employees_aid = $_GET['employeesid'];
  checkId($employees->employees_aid);
  $query = checkReadById($employees);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($employees);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();