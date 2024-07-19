<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$admin = new Admin($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("adminid", $_GET)) {
  $admin->user_admin_aid = $_GET['adminid'];
  checkId($admin->user_admin_aid);
  $query = checkReadById($admin);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($admin);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
