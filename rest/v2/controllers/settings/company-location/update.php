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
  // check data
  checkPayload($data);
  // get data
  $companyLocation->company_location_aid = $_GET['company_locationid'];
  $companyLocation->company_location_subscriber_id = $data["company_location_subscriber_id"];
  $companyLocation->company_location_subscriber_code = $data["company_location_subscriber_code"];
  $companyLocation->company_location_company_name = checkIndex($data, "company_location_company_name");
  $companyLocation->company_location_name = checkIndex($data, "company_location_name");

  $companyLocation->company_location_datetime = date("Y-m-d H:i:s");
  checkId($companyLocation->company_location_aid);


  // //checks current data to avoid same entries from being updated
  $company_location_company_name_old = checkIndex($data, "company_location_company_name_old");
  $company_location_name_old = checkIndex($data, "company_location_name_old");
  $subscriberName = checkIndex($data, "subscriberName");

  compareName(
    $companyLocation,
    $companyLocation->company_location_name,
    $company_location_name_old,
    $companyLocation->company_location_company_name,
    $company_location_company_name_old,
    $subscriberName,
  );

  // update
  $query = checkUpdate($companyLocation);
  returnSuccess($companyLocation, "company_location", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
