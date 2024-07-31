<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employeesInfo = new EmployeesInfo($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("employeesInfoid", $_GET)) {
  // check data
  checkPayload($data);
  // get data

  $employeesInfo->employees_aid = $_GET['employeesInfoid'];
  $employeesInfo->employees_number = checkIndex($data, "employees_number");
  $employeesInfo->employees_fname = checkIndex($data, "employees_fname");
  $employeesInfo->employees_lname = checkIndex($data, "employees_lname");
  $employeesInfo->employees_mname = $data['employees_mname'];
  $employeesInfo->employees_birth_date = checkIndex($data, "employees_birth_date");
  $employeesInfo->employees_marital_status = checkIndex($data, "employees_marital_status");
  $employeesInfo->employees_street = checkIndex($data, "employees_street");
  $employeesInfo->employees_city = checkIndex($data, "employees_city");
  $employeesInfo->employees_province = checkIndex($data, "employees_province");
  $employeesInfo->employees_country = checkIndex($data, "employees_country");
  $employeesInfo->employees_postal_code = checkIndex($data, "employees_postal_code");
  $employeesInfo->employees_mobile_number = checkIndex($data, "employees_mobile_number");
  $employeesInfo->employees_telephone_number = checkIndex($data, "employees_telephone_number");
  $employeesInfo->employees_personal_email = checkIndex($data, "employees_personal_email");


  $employeesInfo->employees_datetime = date("Y-m-d H:i:s");
  checkId($employeesInfo->employees_aid);


  //checks current data to avoid same entries from being updated
  $employees_fname_old = checkIndex($data, 'employees_fname_old');
  compareName($employeesInfo, $employees_fname_old, $employeesInfo->employees_fname);

  // update
  $query = checkUpdate($employeesInfo);
  returnSuccess($employeesInfo, "employeesInfo", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
