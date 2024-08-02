<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/leave/leave-type/LeaveType.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new LeaveType($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("leave_typeid", $_GET)) {
    // check data
    checkPayload($data);
    $leave_type->leave_type_aid = $_GET['leave_typeid'];
    $leave_type->leave_type_is_active = trim($data["isActive"]);
    $leave_type->leave_type_datetime = date("Y-m-d H:i:s");
    checkId($leave_type->leave_type_aid);
    $query = checkActive($leave_type);
    http_response_code(200);
    returnSuccess($leave_type, "leave_type", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
