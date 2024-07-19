<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/user/System.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$system = new System($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("systemid", $_GET)) {
    // check data
    checkPayload($data);
    $system->user_system_aid = $_GET['systemid'];
    $system->user_system_is_active = trim($data["isActive"]);
    $system->user_system_datetime = date("Y-m-d H:i:s");
    checkId($system->user_system_aid);
    $query = checkActive($system);
    http_response_code(200);
    returnSuccess($system, "system", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
