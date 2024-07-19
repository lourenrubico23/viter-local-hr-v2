<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/user/Admin.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$admin = new Admin($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("adminid", $_GET)) {
    // check data
    checkPayload($data);
    $admin->user_admin_aid = $_GET['adminid'];
    $admin->user_admin_is_active = trim($data["isActive"]);
    $admin->user_admin_datetime = date("Y-m-d H:i:s");
    checkId($admin->user_admin_aid);
    $query = checkActive($admin);
    http_response_code(200);
    returnSuccess($admin, "admin", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
