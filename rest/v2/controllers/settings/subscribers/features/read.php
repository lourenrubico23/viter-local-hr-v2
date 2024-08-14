<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$features = new Features($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("featuresid", $_GET)) {
  $features->features_aid = $_GET['featuresid'];
  checkId($features->features_aid);
  $query = checkReadById($features);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($features);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();