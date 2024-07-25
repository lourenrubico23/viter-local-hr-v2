<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/employees/Employees.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("employeesid", $_GET)) {
    // check data
    checkPayload($data);
    $employees->employees_aid = $_GET['employeesid'];
    $employees->employees_is_active = trim($data["isActive"]);
    $employees->employees_datetime = date("Y-m-d H:i:s");
    checkId($employees->employees_aid);
    $query = checkActive($employees);
    http_response_code(200);
    returnSuccess($employees, "employees", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
