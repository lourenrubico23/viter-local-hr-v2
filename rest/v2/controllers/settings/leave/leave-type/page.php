<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/leave/leave-type/LeaveType.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new LeaveType($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $leave_type->leave_type_start = $_GET['start'];
        $leave_type->leave_type_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($leave_type->leave_type_start, $leave_type->leave_type_total);

        $query = checkReadLimit($leave_type);
        $total_result = checkReadAll($leave_type);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $leave_type->leave_type_total,
            $leave_type->leave_type_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
