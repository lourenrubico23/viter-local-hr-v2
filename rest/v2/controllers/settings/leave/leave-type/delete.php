<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new LeaveType($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("leave_typeid", $_GET)) {
  // get data
  $leave_type->leave_type_aid = $_GET['leave_typeid'];
  checkId($leave_type->leave_type_aid);
  isAssociatedLeaveBenefitsLeaveTypeName($leave_type);

  $query = checkDelete($leave_type);

  returnSuccess($leave_type, "leave_type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
