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
  // get data
  $companyInfo->company_info_aid = $_GET['companyinfoid'];
  checkId($companyInfo->company_info_aid);

  $query = checkDelete($companyInfo);

  returnSuccess($companyInfo, "companyinfo", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
