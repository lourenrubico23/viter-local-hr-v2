<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$leave_type = new LeaveType($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$leave_type->leave_type_is_active = 1;
$leave_type->leave_type_type = checkIndex($data, "leave_type_type");
$leave_type->leave_type_subscriber = checkIndex($data, "leave_type_subscriber");
$leave_type->leave_type_created = date("Y-m-d H:i:s");
$leave_type->leave_type_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($leave_type, $leave_type->leave_type_type);

$query = checkCreate($leave_type);

returnSuccess($leave_type, "leave_type", $query);
