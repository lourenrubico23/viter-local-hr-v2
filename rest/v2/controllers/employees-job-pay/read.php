<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employeesJobAndPay = new EmployeesJobAndPay($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("employeesJobAndPayid", $_GET)) {
  $employeesJobAndPay->employees_aid = $_GET['employeesJobAndPayid'];
  checkId($employeesJobAndPay->employees_aid);
  $query = checkReadById($employeesJobAndPay);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($employeesJobAndPay);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
