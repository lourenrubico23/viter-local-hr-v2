<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/company-info/CompanyInfo.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$companyInfo = new CompanyInfo($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $companyInfo->company_info_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        $companyInfo->company_info_is_active = checkIndex($data, "company_info_is_active");
        // only if search with filter / for status only
        if ($companyInfo->company_info_search != "") {
            $query = checkFilterByStatusAndSearch($companyInfo);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($companyInfo);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($companyInfo);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
