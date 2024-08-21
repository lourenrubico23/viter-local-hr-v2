<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyInfo = new CompanyInfo($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("companyinfoid", $_GET)) {
  $companyInfo->company_info_aid = $_GET['companyinfoid'];
  checkId($companyInfo->company_info_aid);
  $query = checkReadById($companyInfo);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($companyInfo);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();