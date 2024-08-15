<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$addons = new Addons($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("addonsid", $_GET)) {
  $addons->addons_aid = $_GET['addonsid'];
  checkId($addons->addons_aid);
  $query = checkReadById($addons);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($addons);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();