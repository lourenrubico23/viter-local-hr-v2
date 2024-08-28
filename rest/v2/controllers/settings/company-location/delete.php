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
  // get data
  $companyLocation->company_location_aid = $_GET['company_locationid'];
  checkId($companyLocation->company_location_aid);

  $query = checkDelete($companyLocation);

  returnSuccess($companyLocation, "company_location", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
