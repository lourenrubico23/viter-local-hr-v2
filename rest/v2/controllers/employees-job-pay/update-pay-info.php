<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/employees/EmployeesJobAndPay.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes 
$employeesJobAndPay = new EmployeesJobAndPay($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();

  if (array_key_exists("employeesJobAndPayid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $employeesJobAndPay->employees_aid = $_GET['employeesJobAndPayid'];
    $employeesJobAndPay->employees_eligibility = $data["employees_eligibility"];
    $employeesJobAndPay->employees_bank_account = checkIndex($data, "employees_bank_account");
    $employeesJobAndPay->employees_pay_type = checkIndex($data, "employees_pay_type");
    $employeesJobAndPay->employees_per_hour = checkIndex($data, "employees_per_hour");
    $employeesJobAndPay->employees_hour_per_pay = checkIndex($data, "employees_hour_per_pay");
    $employeesJobAndPay->employees_pay_frequency = checkIndex($data, "employees_pay_frequency");
    $employeesJobAndPay->employees_working_days = checkIndex($data, "employees_working_days");
    $employeesJobAndPay->employees_rest_day = checkIndex($data, "employees_rest_day");
    $employeesJobAndPay->employees_working_hours_start = checkIndex($data, "employees_working_hours_start");
    $employeesJobAndPay->employees_working_hours_end = checkIndex($data, "employees_working_hours_end");

    $employeesJobAndPay->employees_datetime = date("Y-m-d H:i:s");
    checkId($employeesJobAndPay->employees_aid);


    //checks current data to avoid same entries from being updated
    $employees_bank_account_old = checkIndex($data, 'employees_bank_account_old');
    compareName($employeesJobAndPay, $employees_bank_account_old, $employeesJobAndPay->employees_bank_account);

    // update
    $query = checkUpdatePayInfo($employeesJobAndPay);
    returnSuccess($employeesJobAndPay, "employeesJobAndPay", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
