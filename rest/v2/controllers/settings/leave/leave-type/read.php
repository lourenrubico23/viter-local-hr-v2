<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new LeaveType($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("leave_typeid", $_GET)) {
  $leave_type->leave_type_aid = $_GET['leave_typeid'];
  checkId($leave_type->leave_type_aid);
  $query = checkReadById($leave_type);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($leave_type);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
