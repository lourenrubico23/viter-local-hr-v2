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
  // get data
  $leave_benefits->leave_benefits_aid = $_GET['leave_benefitsid'];
  checkId($leave_benefits->leave_benefits_aid);

  $query = checkDelete($leave_benefits);

  returnSuccess($leave_benefits, "leave_benefits", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
