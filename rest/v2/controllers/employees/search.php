<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/employees/Employees.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// // validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    // get data
    $employees->employees_search = $data["searchValue"];

    // only if filtering
    if ($data["isFilter"]) {
        // only if search with filter
        $employees->employees_is_active = $data["employees_is_active"];
        $employees->employees_department_id = $data["employees_department_id"];
        // search by status active, department and search
        if (
            $employees->employees_search != ""
            && $employees->employees_department_id != ""
            && $employees->employees_is_active != ""
        ) {
            $query = checkFilterByStatusDepartmentAndSearch($employees);
            http_response_code(200);
            getQueriedData($query);
        }
        // department and search
        if ($employees->employees_department_id != "" && $employees->employees_search != "") {
            $query = checkSearchAndDepartment($employees);
            http_response_code(200);
            getQueriedData($query);
        }
        // status and search
        if ($employees->employees_is_active != "" && $employees->employees_search != "") {
            $query = checkSearchAndStatus($employees);
            http_response_code(200);
            getQueriedData($query);
        }
        // search by both department id and status active
        if (
            $employees->employees_department_id != ""
            && $employees->employees_is_active != ""
        ) {
            $query = checkFilterByStatusAndDepartment($employees);
            http_response_code(200);
            getQueriedData($query);
        }
        // search by department id only
        if ($employees->employees_department_id != "") {
            $query = checkFilterByDepartment($employees);
            http_response_code(200);
            getQueriedData($query);
        }
        // if filter only
        $query = checkFilterByStatus($employees);
        http_response_code(200);
        getQueriedData($query);
    }

    $query = checkSearch($employees);
    http_response_code(200);
    getQueriedData($query);
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
