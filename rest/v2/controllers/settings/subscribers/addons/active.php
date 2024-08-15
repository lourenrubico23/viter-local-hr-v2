<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/subscribers/addons/Addons.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$addons = new Addons($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("addonsid", $_GET)) {
    // check data
    checkPayload($data);
    $addons->addons_aid = $_GET['addonsid'];
    $addons->addons_is_active = trim($data["isActive"]);
    $addons->addons_datetime = date("Y-m-d H:i:s");
    checkId($addons->addons_aid);
    $query = checkActive($addons);
    http_response_code(200);
    returnSuccess($addons, "addons", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
