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
  // get data
  $job_level->job_level_aid = $_GET['job_levelid'];
  checkId($job_level->job_level_aid);
  isAssociatedJobTitleJobLevelName($job_level);
  isAssociatedLeaveBenefitsJobLevelName($job_level);

  $query = checkDelete($job_level);

  returnSuccess($job_level, "job_level", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
