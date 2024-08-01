<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/announcement/Announcement.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $announcement->announcement_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        $announcement->announcement_is_active = checkIndex($data, "announcement_is_active");
        // only if search with filter / for status only
        if ($announcement->announcement_search != "") {
            $query = checkFilterByStatusAndSearch($announcement);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($announcement);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($announcement);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
