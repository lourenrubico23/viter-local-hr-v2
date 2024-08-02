<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../../models/settings/job/job-title/JobTitle.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new JobTitle($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("job_titleid", $_GET)) {
    // check data
    checkPayload($data);
    $job_title->job_title_aid = $_GET['job_titleid'];
    $job_title->job_title_is_active = trim($data["isActive"]);
    $job_title->job_title_datetime = date("Y-m-d H:i:s");
    checkId($job_title->job_title_aid);
    $query = checkActive($job_title);
    http_response_code(200);
    returnSuccess($job_title, "job_title", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
