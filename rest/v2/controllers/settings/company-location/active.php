<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/company-location/CompanyLocation.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyLocation = new CompanyLocation($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("company_locationid", $_GET)) {
    // check data
    checkPayload($data);
    $companyLocation->company_location_aid = $_GET['company_locationid'];
    $companyLocation->company_location_is_active = trim($data["isActive"]);
    $companyLocation->company_location_datetime = date("Y-m-d H:i:s");
    checkId($companyLocation->company_location_aid);
    $query = checkActive($companyLocation);
    http_response_code(200);
    returnSuccess($companyLocation, "company_location", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
