<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_title = new JobTitle($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("job_titleid", $_GET)) {
  $job_title->job_title_aid = $_GET['job_titleid'];
  checkId($job_title->job_title_aid);
  $query = checkReadById($job_title);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($job_title);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();