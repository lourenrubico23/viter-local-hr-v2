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
    $employeesJobAndPay->employees_mother_maiden = checkIndex($data, "employees_mother_maiden");
    $employeesJobAndPay->employees_mother_fname = checkIndex($data, "employees_mother_fname");
    $employeesJobAndPay->employees_mother_mname = checkIndex($data, "employees_mother_mname");
    $employeesJobAndPay->employees_father_lname = checkIndex($data, "employees_father_lname");
    $employeesJobAndPay->employees_father_fname = checkIndex($data, "employees_father_fname");
    $employeesJobAndPay->employees_father_mname = checkIndex($data, "employees_father_mname");
    $employeesJobAndPay->employees_family_contact = checkIndex($data, "employees_family_contact");
    $employeesJobAndPay->employees_family_address = checkIndex($data, "employees_family_address");
    $employeesJobAndPay->employees_emergency_contact_name = checkIndex($data, "employees_emergency_contact_name");
    $employeesJobAndPay->employees_emergency_contact_relationship = checkIndex($data, "employees_emergency_contact_relationship");
    $employeesJobAndPay->employees_emergency_contact_number = checkIndex($data, "employees_emergency_contact_number");
    $employeesJobAndPay->employees_emergency_contact_address = checkIndex($data, "employees_emergency_contact_address");

    $employeesJobAndPay->employees_datetime = date("Y-m-d H:i:s");
    checkId($employeesJobAndPay->employees_aid);


    //checks current data to avoid same entries from being updated
    // $employees_mother_fname_old = checkIndex($data, 'employees_mother_fname');
    // compareName($employeesJobAndPay, $employees_mother_fname_old, $employeesJobAndPay->employees_mother_fname);

    // update
    $query = checkUpdateFamilyInfo($employeesJobAndPay);
    returnSuccess($employeesJobAndPay, "employeesJobAndPay", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
