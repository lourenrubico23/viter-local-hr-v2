<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/job/job-level/JobLevel.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new JobLevel($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $job_level->job_level_start = $_GET['start'];
        $job_level->job_level_total = 11;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($job_level->job_level_start, $job_level->job_level_total);

        $query = checkReadLimit($job_level);
        $total_result = checkReadAll($job_level);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $job_level->job_level_total,
            $job_level->job_level_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();