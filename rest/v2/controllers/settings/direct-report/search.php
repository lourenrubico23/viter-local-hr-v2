<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/direct-report/DirectReport.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$directReport = new DirectReport($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $directReport->direct_report_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        $directReport->direct_report_is_active = checkIndex($data, "direct_report_is_active");
        // only if search with filter / for status only
        if ($directReport->direct_report_search != "") {
            $query = checkFilterByStatusAndSearch($directReport);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($directReport);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($directReport);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
