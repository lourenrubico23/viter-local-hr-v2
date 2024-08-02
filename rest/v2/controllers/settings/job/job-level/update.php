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
  // check data
  checkPayload($data);
  // get data
  $job_level->job_level_aid = $_GET['job_levelid'];
  $job_level->job_level_level = checkIndex($data, "job_level_level");
  $job_level->job_level_subscriber = checkIndex($data, "job_level_subscriber");
  

  $job_level->job_level_datetime = date("Y-m-d H:i:s");
  checkId($job_level->job_level_aid);


  //checks current data to avoid same entries from being updated
  $job_level_level_old = checkIndex($data, 'job_level_level_old');
  compareName($job_level, $job_level_level_old, $job_level->job_level_level);

  // update
  $query = checkUpdate($job_level);
  returnSuccess($job_level, "job_level", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
