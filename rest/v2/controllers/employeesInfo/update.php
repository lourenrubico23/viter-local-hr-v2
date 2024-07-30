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
  $employeesInfo->employees_info_aid = $_GET['employeesInfoid'];
  $employeesInfo->employees_info_employees_fname_id = checkIndex($data, "employees_info_employees_fname_id");
  $employeesInfo->employees_info_employees_lname_id = checkIndex($data, "employees_info_employees_lname_id");
  $employeesInfo->employees_info_employees_mname_id = checkIndex($data, "employees_info_employees_mname_id");
  $employeesInfo->employees_info_employees_birth_date_id = checkIndex($data, "employees_info_employees_birth_date_id");
  $employeesInfo->employees_info_employees_marital_status_id = checkIndex($data, "employees_info_employees_marital_status_id");
  $employeesInfo->employees_info_street = checkIndex($data, "employees_info_street");
  $employeesInfo->employees_info_city = checkIndex($data, "employees_info_city");
  $employeesInfo->employees_info_province = checkIndex($data, "employees_info_province");
  $employeesInfo->employees_info_country = checkIndex($data, "employees_info_country");
  $employeesInfo->employees_info_postal_code = checkIndex($data, "employees_info_postal_code");
  $employeesInfo->employees_info_employees_mobile_number_id = checkIndex($data, "employees_info_employees_mobile_number_id");
  $employeesInfo->employees_info_telephone_number = checkIndex($data, "employees_info_telephone_number");
  $employeesInfo->employees_info_employees_personal_email_id = checkIndex($data, "employees_info_employees_personal_email_id");


  $employeesInfo->employees_info_datetime = date("Y-m-d H:i:s");
  checkId($employeesInfo->employees_info_aid);


  //checks current data to avoid same entries from being updated
  $employees_info_employees_fname_id_old = checkIndex($data, 'employees_info_employees_fname_id_old');
  compareName($employeesInfo, $employees_info_employees_fname_id_old, $employeesInfo->employees_info_employees_fname_id);

  // update
  $query = checkUpdate($employeesInfo);
  returnSuccess($employeesInfo, "employeesInfo", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
