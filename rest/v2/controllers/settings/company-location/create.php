<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyLocation = new CompanyLocation($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$companyLocation->company_location_is_active = 1;
$companyLocation->company_location_subscriber_id = $data["company_location_subscriber_id"];
$companyLocation->company_location_subscriber_code = $data["company_location_subscriber_code"];
$companyLocation->company_location_company_name = checkIndex($data, "company_location_company_name");
$companyLocation->company_location_name = checkIndex($data, "company_location_name");
$companyLocation->company_location_created = date("Y-m-d H:i:s");
$companyLocation->company_location_datetime = date("Y-m-d H:i:s");

// id to text convertion
$subscriberName = checkIndex($data, "subscriberName");
//checks newly added data if it already exists
isNameExist($companyLocation, $subscriberName);


$query = checkCreate($companyLocation);

returnSuccess($companyLocation, "company_location", $query);
