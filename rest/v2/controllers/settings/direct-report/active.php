<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/direct-report/DirectReport.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$directReport = new DirectReport($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("direct_reportid", $_GET)) {
    // check data
    checkPayload($data);
    $directReport->direct_report_aid = $_GET['direct_reportid'];
    $directReport->direct_report_is_active = trim($data["isActive"]);
    $directReport->direct_report_datetime = date("Y-m-d H:i:s");
    checkId($directReport->direct_report_aid);
    $query = checkActive($directReport);
    http_response_code(200);
    returnSuccess($directReport, "direct_report", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
