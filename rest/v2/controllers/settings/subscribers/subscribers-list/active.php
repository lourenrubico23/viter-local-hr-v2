<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/subscribers/subscribers-list/Subscribers.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("subscribersid", $_GET)) {
    // check data
    checkPayload($data);
    $subscribers->subscribers_aid = $_GET['subscribersid'];
    $subscribers->subscribers_is_active = trim($data["isActive"]);
    $subscribers->subscribers_datetime = date("Y-m-d H:i:s");
    checkId($subscribers->subscribers_aid);
    $query = checkActive($subscribers);
    http_response_code(200);
    returnSuccess($subscribers, "subscribers", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
