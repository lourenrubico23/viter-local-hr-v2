<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/Department.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("departmentid", $_GET)) {
    // check data
    checkPayload($data);
    $department->department_aid = $_GET['departmentid'];
    $department->department_is_active = trim($data["isActive"]);
    $department->department_datetime = date("Y-m-d H:i:s");
    checkId($department->department_aid);
    $query = checkActive($department);
    http_response_code(200);
    returnSuccess($department, "department", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
