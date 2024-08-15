<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/subscribers/addons/Addons.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$addons = new Addons($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $addons->addons_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        $addons->addons_is_active = checkIndex($data, "addons_is_active");
        // only if search with filter / for status only
        if ($addons->addons_search != "") {
            $query = checkFilterByStatusAndSearch($addons);
            http_response_code(200);
            getQueriedData($query);
        }

        $query = checkFilterByStatus($addons);
        http_response_code(200);
        getQueriedData($query);
    }
    // if search only
    $query = checkSearch($addons);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
