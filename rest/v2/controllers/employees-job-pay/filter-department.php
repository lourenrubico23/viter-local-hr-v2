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
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $employeesJobAndPay->department_subscribers_id = $data["department_subscribers_id"];
    $employeesJobAndPay->employeesJobAndPay_search = $data["searchValue"];

    // if search only
    $query = checkFilterDepartment($employeesJobAndPay);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
