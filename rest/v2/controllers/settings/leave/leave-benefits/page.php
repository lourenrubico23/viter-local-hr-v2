<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/leave/leave-benefits/LeaveBenefits.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_benefits = new LeaveBenefits($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $leave_benefits->leave_benefits_start = $_GET['start'];
        $leave_benefits->leave_benefits_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($leave_benefits->leave_benefits_start, $leave_benefits->leave_benefits_total);

        $query = checkReadLimit($leave_benefits);
        $total_result = checkReadAll($leave_benefits);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $leave_benefits->leave_benefits_total,
            $leave_benefits->leave_benefits_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
