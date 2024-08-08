<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_benefits = new LeaveBenefits($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("leave_benefitsid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $leave_benefits->leave_benefits_aid = $_GET['leave_benefitsid'];
  $leave_benefits->leave_benefits_subscriber = checkIndex($data, "leave_benefits_subscriber");
  $leave_benefits->leave_benefits_job_level_id = checkIndex($data, "leave_benefits_job_level_id");
  $leave_benefits->leave_benefits_job_title_id = checkIndex($data, "leave_benefits_job_title_id");
  $leave_benefits->leave_benefits_leave_type_id = checkIndex($data, "leave_benefits_leave_type_id");
  $leave_benefits->leave_benefits_days = checkIndex($data, "leave_benefits_days");


  $leave_benefits->leave_benefits_datetime = date("Y-m-d H:i:s");
  checkId($leave_benefits->leave_benefits_aid);


  //checks current data to avoid same entries from being updated
  $leave_benefits_job_level_id_old = checkIndex($data, 'leave_benefits_job_level_id_old');
  $leave_benefits_job_title_id_old = checkIndex($data, 'leave_benefits_job_title_id_old');
  $leave_benefits_leave_type_id_old = checkIndex($data, 'leave_benefits_leave_type_id_old');

  $jobLevelName = checkIndex($data, "jobLevelName"); // para maiwasan ma over right and id ng text
  // para maiwasan ang pag kakapareho ng input ng job level, job title, and leave type
  compareIdName(
    $leave_benefits,
    $leave_benefits_job_level_id_old,
    $leave_benefits->leave_benefits_job_level_id,
    $leave_benefits_job_title_id_old,
    $leave_benefits->leave_benefits_job_title_id,
    $leave_benefits_leave_type_id_old,
    $leave_benefits->leave_benefits_leave_type_id,
    $jobLevelName,
  );

  // update
  $query = checkUpdate($leave_benefits);
  returnSuccess($leave_benefits, "leave_benefits", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
