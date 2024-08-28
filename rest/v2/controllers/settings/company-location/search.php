<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/company-location/CompanyLocation.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyLocation = new CompanyLocation($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $companyLocation->company_location_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        // filter with status
        $companyLocation->company_location_is_active = checkIndex($data, "company_location_is_active");
        $companyLocation->company_location_subscriber_id = checkIndex($data, "company_location_subscriber_id");
        // filter by status, subscriber code, and search
        if (
            $companyLocation->company_location_search != "" && $companyLocation->company_location_subscriber_id != "" &&  $companyLocation->company_location_is_active != ""
        ) {
            $query = checkFilterByStatusSubscriberCodeAndSearch($companyLocation);
            http_response_code(200);
            getQueriedData($query);
        }
        // filter with subscriber code and search
        if ($companyLocation->company_location_subscriber_id != "" && $companyLocation->company_location_search != "") {
            $query = checkFilterBySubscriberCodeAndSearch($companyLocation);
            http_response_code(200);
            getQueriedData($query);
        }
        // filter with status and search
        if ($companyLocation->company_location_is_active != "" && $companyLocation->company_location_search != "") {
            $query = checkSearchAndStatus($companyLocation);
            http_response_code(200);
            getQueriedData($query);
        }
        // filter with subscriber code and status
        if ($companyLocation->company_location_subscriber_id != "" && $companyLocation->company_location_is_active != "") {
            $query = checkFilterByStatusAndSubscriberCode($companyLocation);
            http_response_code(200);
            getQueriedData($query);
        }
        // filter with subscriber code only
        if ($companyLocation->company_location_subscriber_id != "") {
            $query = checkFilterBySubscriberCode($companyLocation);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($companyLocation);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($companyLocation);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
