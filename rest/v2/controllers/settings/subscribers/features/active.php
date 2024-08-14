<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/subscribers/features/Features.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$features = new Features($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("featuresid", $_GET)) {
    // check data
    checkPayload($data);
    $features->features_aid = $_GET['featuresid'];
    $features->features_is_active = trim($data["isActive"]);
    $features->features_datetime = date("Y-m-d H:i:s");
    checkId($features->features_aid);
    $query = checkActive($features);
    http_response_code(200);
    returnSuccess($features, "features", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
