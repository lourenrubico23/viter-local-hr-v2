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
  // check data
  checkPayload($data);
  // get data
  $job_title->job_title_aid = $_GET['job_titleid'];
  $job_title->job_title_title = checkIndex($data, "job_title_title");
  $job_title->job_title_job_level_id = checkIndex($data, "job_title_job_level_id");
  $job_title->job_title_subscriber_id = checkIndex($data, "job_title_subscriber_id");
  $job_title->job_title_subscriber_code = checkIndex($data, "job_title_subscriber_code");
  

  $job_title->job_title_datetime = date("Y-m-d H:i:s");
  checkId($job_title->job_title_aid);


  //checks current data to avoid same entries from being updated
  $job_title_title_old = checkIndex($data, 'job_title_title_old');
  compareName($job_title, $job_title_title_old, $job_title->job_title_title);

  // update
  $query = checkUpdate($job_title);
  returnSuccess($job_title, "job_title", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
