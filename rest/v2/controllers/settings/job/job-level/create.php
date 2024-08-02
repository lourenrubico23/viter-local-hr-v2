<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$job_level = new JobLevel($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$job_level->job_level_is_active = 1;
$job_level->job_level_level = checkIndex($data, "job_level_level");
$job_level->job_level_subscriber = checkIndex($data, "job_level_subscriber");
$job_level->job_level_created = date("Y-m-d H:i:s");
$job_level->job_level_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($job_level, $job_level->job_level_level);

$query = checkCreate($job_level);

returnSuccess($job_level, "job_level", $query);
