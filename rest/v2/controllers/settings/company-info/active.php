<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/company-info/CompanyInfo.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyInfo = new CompanyInfo($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("companyinfoid", $_GET)) {
    // check data
    checkPayload($data);
    $companyInfo->company_info_aid = $_GET['companyinfoid'];
    $companyInfo->company_info_is_active = trim($data["isActive"]);
    $companyInfo->company_info_datetime = date("Y-m-d H:i:s");
    checkId($companyInfo->company_info_aid);
    $query = checkActive($companyInfo);
    http_response_code(200);
    returnSuccess($companyInfo, "companyinfo", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
