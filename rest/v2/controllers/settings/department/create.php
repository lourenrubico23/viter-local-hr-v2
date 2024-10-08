<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$department->department_is_active = 1;
$department->department_name = checkIndex($data, "department_name");
$department->department_subscribers_id = checkIndex($data, "department_subscribers_id");
$department->department_subscriber_code = checkIndex($data, "department_subscriber_code");
$department->department_created = date("Y-m-d H:i:s");
$department->department_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($department, $department->department_name);

$query = checkCreate($department);

returnSuccess($department, "department", $query);
