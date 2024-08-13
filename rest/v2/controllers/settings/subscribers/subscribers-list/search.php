<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/subscribers/subscribers-list/Subscribers.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $subscribers->subscribers_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        $subscribers->subscribers_is_active = checkIndex($data, "subscribers_is_active");
        // only if search with filter / for status only
        if ($subscribers->subscribers_search != "") {
            $query = checkFilterByStatusAndSearch($subscribers);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($subscribers);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($subscribers);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
