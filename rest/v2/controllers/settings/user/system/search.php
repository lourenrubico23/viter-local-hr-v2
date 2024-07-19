<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/user/System.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$system = new System($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $system->user_system_search = $data["searchValue"];

    // // only if filtering
    // if ($data["isFilter"]) {

    //     // only if search with filter
    //     if ($system->system_search != "") {

    //         $system->system_is_active = checkIndex($data, "system_is_active");
    //         $query = checkSearchByStatus($system);
    //         http_response_code(200);
    //         getQueriedData($query);
    //     }

    //     // if filter only
    //     $system->system_is_active = checkIndex($data, "system_is_active");
    //     $query = checkFilterByStatus($system);
    //     http_response_code(200);
    //     getQueriedData($query);
    // }

    $query = checkSearch($system);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();