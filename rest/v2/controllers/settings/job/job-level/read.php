<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new JobLevel($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("job_levelid", $_GET)) {
  $job_level->job_level_aid = $_GET['job_levelid'];
  checkId($job_level->job_level_aid);
  $query = checkReadById($job_level);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($job_level);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();