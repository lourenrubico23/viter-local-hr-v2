<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_benefits = new LeaveBenefits($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$leave_benefits->leave_benefits_is_active = 1;
$leave_benefits->leave_benefits_subscriber = checkIndex($data, "leave_benefits_subscriber");
$leave_benefits->leave_benefits_job_level_id = checkIndex($data, "leave_benefits_job_level_id");
$leave_benefits->leave_benefits_job_title_id = checkIndex($data, "leave_benefits_job_title_id");
$leave_benefits->leave_benefits_leave_type_id = checkIndex($data, "leave_benefits_leave_type_id");
$leave_benefits->leave_benefits_days = checkIndex($data, "leave_benefits_days");
$leave_benefits->leave_benefits_created = date("Y-m-d H:i:s");
$leave_benefits->leave_benefits_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($leave_benefits, $leave_benefits->leave_benefits_job_level_id);
isNameExist($leave_benefits, $leave_benefits->leave_benefits_job_title_id);
isNameExist($leave_benefits, $leave_benefits->leave_benefits_leave_type_id);

$query = checkCreate($leave_benefits);

returnSuccess($leave_benefits, "leave_benefits", $query);
