<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/leave/leave-benefits/LeaveBenefits.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_benefits = new LeaveBenefits($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("leave_benefitsid", $_GET)) {
    // check data
    checkPayload($data);
    $leave_benefits->leave_benefits_aid = $_GET['leave_benefitsid'];
    $leave_benefits->leave_benefits_is_active = trim($data["isActive"]);
    $leave_benefits->leave_benefits_datetime = date("Y-m-d H:i:s");
    checkId($leave_benefits->leave_benefits_aid);
    $query = checkActive($leave_benefits);
    http_response_code(200);
    returnSuccess($leave_benefits, "leave_benefits", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
