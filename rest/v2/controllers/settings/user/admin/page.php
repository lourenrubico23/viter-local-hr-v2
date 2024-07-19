<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../../models/settings/user/Admin.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$admin = new Admin($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $admin->user_admin_start = $_GET['start'];
        $admin->user_admin_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($admin->user_admin_start, $admin->user_admin_total);

        $query = checkReadLimit($admin);
        $total_result = checkReadAll($admin);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $admin->user_admin_total,
            $admin->user_admin_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();