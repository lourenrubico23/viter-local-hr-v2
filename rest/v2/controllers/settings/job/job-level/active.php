<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/job/job-level/JobLevel.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new JobLevel($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("job_levelid", $_GET)) {
    // check data
    checkPayload($data);
    $job_level->job_level_aid = $_GET['job_levelid'];
    $job_level->job_level_is_active = trim($data["isActive"]);
    $job_level->job_level_datetime = date("Y-m-d H:i:s");
    checkId($job_level->job_level_aid);
    $query = checkActive($job_level);
    http_response_code(200);
    returnSuccess($job_level, "job_level", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
