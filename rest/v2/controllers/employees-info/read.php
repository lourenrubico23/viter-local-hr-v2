<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employeesInfo = new EmployeesInfo($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("employeesInfoid", $_GET)) {
  $employeesInfo->employees_aid = $_GET['employeesInfoid'];
  checkId($employeesInfo->employees_aid);
  $query = checkReadById($employeesInfo);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($employeesInfo);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
