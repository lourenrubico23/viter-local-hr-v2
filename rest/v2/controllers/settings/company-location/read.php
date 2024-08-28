<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyLocation = new CompanyLocation($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("company_locationid", $_GET)) {
  $companyLocation->company_location_aid = $_GET['company_locationid'];
  checkId($companyLocation->company_location_aid);
  $query = checkReadById($companyLocation);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($companyLocation);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();