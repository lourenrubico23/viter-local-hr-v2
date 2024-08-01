<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$employees = new Employees($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$employees->employees_is_active = 1;
$employees->employees_fname = checkIndex($data, "employees_fname");
$employees->employees_lname = checkIndex($data, "employees_lname");
$employees->employees_mname = $data["employees_mname"];
$employees->employees_gender = checkIndex($data, "employees_gender");
$employees->employees_department_id = checkIndex($data, "employees_department_id");
$employees->employees_personal_email = checkIndex($data, "employees_personal_email");
$employees->employees_birth_date = checkIndex($data, "employees_birth_date");
$employees->employees_marital_status = checkIndex($data, "employees_marital_status");
$employees->employees_date_employed = checkIndex($data, "employees_date_employed");
$employees->employees_mobile_number = checkIndex($data, "employees_mobile_number");
$employees->employees_work_email = checkIndex($data, "employees_work_email");
$employees->employees_number = checkIndex($data, "employees_number");
$employees->employees_created = date("Y-m-d H:i:s");
$employees->employees_datetime = date("Y-m-d H:i:s");


//checks newly added data if it already exists
isNameExist($employees, $employees->employees_fname);

$query = checkCreate($employees);


returnSuccess($employees, "employees", $query);
