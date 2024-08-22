<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyInfo = new CompanyInfo($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$companyInfo->company_info_is_active = 1;
$companyInfo->company_info_subscriber_id = checkIndex($data, "company_info_subscriber_id");
$companyInfo->company_info_subscriber_code = checkIndex($data, "company_info_subscriber_code");
$companyInfo->company_info_subscriber_company_name = checkIndex($data, "company_info_subscriber_company_name");
$companyInfo->company_info_phone = $data["company_info_phone"];
$companyInfo->company_info_email = $data["company_info_email"];
$companyInfo->company_info_street = $data["company_info_street"];
$companyInfo->company_info_city = $data["company_info_city"];
$companyInfo->company_info_province = $data["company_info_province"];
$companyInfo->company_info_postal = $data["company_info_postal"];
$companyInfo->company_info_country = $data["company_info_country"];
$companyInfo->company_info_primary_color = $data["company_info_primary_color"];
$companyInfo->company_info_secondary_color = $data["company_info_secondary_color"];
$companyInfo->company_info_accent_color = $data["company_info_accent_color"];
$companyInfo->company_info_image = $data["company_info_image"];
$companyInfo->company_info_created = date("Y-m-d H:i:s");
$companyInfo->company_info_datetime = date("Y-m-d H:i:s");


$subscriberName = checkIndex($data, "subscriberName");
//checks newly added data if it already exists
isNameExist($companyInfo, $subscriberName);

$query = checkCreate($companyInfo);

returnSuccess($companyInfo, "companyinfo", $query);
