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
  // check data
  checkPayload($data);
  // get data
  $leave_type->leave_type_aid = $_GET['leave_typeid'];
  $leave_type->leave_type_type = checkIndex($data, "leave_type_type");
  $leave_type->leave_type_subscriber_id = checkIndex($data, "leave_type_subscriber_id");
  $leave_type->leave_type_subscriber_code = checkIndex($data, "leave_type_subscriber_code");


  $leave_type->leave_type_datetime = date("Y-m-d H:i:s");
  checkId($leave_type->leave_type_aid);


  //checks current data to avoid same entries from being updated
  $leave_type_type_old = checkIndex($data, 'leave_type_type_old');
  compareName($leave_type, $leave_type_type_old, $leave_type->leave_type_type);

  // update
  $query = checkUpdate($leave_type);
  returnSuccess($leave_type, "leave_type", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
