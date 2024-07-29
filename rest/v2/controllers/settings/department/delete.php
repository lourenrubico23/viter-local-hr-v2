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
  // get data
  $department->department_aid = $_GET['departmentid'];
  checkId($department->department_aid);
  isAssociatedEmployeesDepartmentName($department);

  $query = checkDelete($department);

  returnSuccess($department, "department", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
