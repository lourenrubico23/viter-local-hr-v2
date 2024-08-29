<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employeesJobAndPay = new EmployeesJobAndPay($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("employeesJobAndPayid", $_GET)) {
  // check data
  checkPayload($data);
  // get data

  $employeesJobAndPay->employees_aid = $_GET['employeesJobAndPayid'];
  $employeesJobAndPay->employees_subscriber_code = $data["employees_subscriber_code"];
  $employeesJobAndPay->employees_subscribers_id = $data["employees_subscribers_id"];
  $employeesJobAndPay->employees_number = $data["employees_number"];
  $employeesJobAndPay->employees_department_id = $data["employees_department_id"];
  $employeesJobAndPay->employees_department_name = $data["employees_department_name"];
  $employeesJobAndPay->employees_work_email = $data["employees_work_email"];
  $employeesJobAndPay->employees_job_level_id = $data["employees_job_level_id"];
  $employeesJobAndPay->employees_job_level_name = $data["employees_job_level_name"];
  $employeesJobAndPay->employees_job_title_id = $data["employees_job_title_id"];
  $employeesJobAndPay->employees_job_title_name = $data["employees_job_title_name"];
  $employeesJobAndPay->employees_date_hire = $data["employees_date_hire"];
  $employeesJobAndPay->employees_regularized_date = $data["employees_regularized_date"];
  $employeesJobAndPay->employees_separated_date = $data["employees_separated_date"];
  $employeesJobAndPay->employees_tin_number = $data["employees_tin_number"];
  $employeesJobAndPay->employees_sss_number = $data["employees_sss_number"];
  $employeesJobAndPay->employees_pagibig_number = $data["employees_pagibig_number"];
  $employeesJobAndPay->employees_philhealth_number = $data["employees_philhealth_number"];
  $employeesJobAndPay->employees_drive_link = $data["employees_drive_link"];
  $employeesJobAndPay->employees_comment = $data["employees_comment"];


  $employeesJobAndPay->employees_datetime = date("Y-m-d H:i:s");
  checkId($employeesJobAndPay->employees_aid);


  //checks current data to avoid same entries from being updated
  $employees_number_old = $data['employees_number_old'];
  compareName($employeesJobAndPay, $employees_number_old, $employeesJobAndPay->employees_number);

  // update
  $query = checkUpdate($employeesJobAndPay);
  returnSuccess($employeesJobAndPay, "employeesJobAndPay", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
