<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("departmentid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $department->department_aid = $_GET['departmentid'];
  $department->department_name = checkIndex($data, "department_name");
  $department->department_subscribers_id = checkIndex($data, "department_subscribers_id");

  $department->department_datetime = date("Y-m-d H:i:s");
  checkId($department->department_aid);


  //checks current data to avoid same entries from being updated
  $department_name_old = checkIndex($data, 'department_name_old');
  compareName($department, $department_name_old, $department->department_name);

  // update
  $query = checkUpdate($department);
  returnSuccess($department, "department", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
