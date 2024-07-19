<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$system = new System($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("systemid", $_GET)) {
  $system->user_system_aid = $_GET['systemid'];
  checkId($system->user_system_aid);
  $query = checkReadById($system);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($system);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
