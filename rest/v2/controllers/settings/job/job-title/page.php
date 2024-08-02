<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/job/job-title/JobTitle.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new JobTitle($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $job_title->job_title_start = $_GET['start'];
        $job_title->job_title_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($job_title->job_title_start, $job_title->job_title_total);

        $query = checkReadLimit($job_title);
        $total_result = checkReadAll($job_title);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $job_title->job_title_total,
            $job_title->job_title_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();