<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("subscribersid", $_GET)) {
  $subscribers->subscribers_aid = $_GET['subscribersid'];
  checkId($subscribers->subscribers_aid);
  $query = checkReadById($subscribers);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($subscribers);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();