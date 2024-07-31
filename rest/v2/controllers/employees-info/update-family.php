<?php

// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/employees-info/EmployeesInfo.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes 
$employeesInfo = new EmployeesInfo($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  checkApiKey();

  if (array_key_exists("employeesInfoid", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $employeesInfo->employees_aid = $_GET['employeesInfoid'];
    $employeesInfo->employees_mother_maiden = checkIndex($data, "employees_mother_maiden");
    $employeesInfo->employees_mother_fname = checkIndex($data, "employees_mother_fname");
    $employeesInfo->employees_father_lname = checkIndex($data, "employees_father_lname");
    $employeesInfo->employees_father_fname = checkIndex($data, "employees_father_fname");
    $employeesInfo->employees_father_mname = checkIndex($data, "employees_father_mname");
    $employeesInfo->employees_family_contact = checkIndex($data, "employees_family_contact");
    $employeesInfo->employees_family_address = checkIndex($data, "employees_family_address");
    $employeesInfo->employees_emergency_contact_name = checkIndex($data, "employees_emergency_contact_name");
    $employeesInfo->employees_emergency_contact_relationship = checkIndex($data, "employees_emergency_contact_relationship");
    $employeesInfo->employees_emergency_contact_number = checkIndex($data, "employees_emergency_contact_number");
    $employeesInfo->employees_emergency_contact_address = checkIndex($data, "employees_emergency_contact_address");

    $employeesInfo->employees_datetime = date("Y-m-d H:i:s");
    checkId($employeesInfo->employees_aid);


    //checks current data to avoid same entries from being updated
    // $employees_mother_fname_old = checkIndex($data, 'employees_mother_fname');
    // compareName($employeesInfo, $employees_mother_fname_old, $employeesInfo->employees_mother_fname);

    // update
    $query = checkUpdateFamilyInfo($employeesInfo);
    returnSuccess($employeesInfo, "employeesInfo", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
