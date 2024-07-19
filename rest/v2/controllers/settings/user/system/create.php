<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$system = new System($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$system->user_system_is_active = 1;
$system->user_system_fname = checkIndex($data, "user_system_fname");
$system->user_system_lname = $data["user_system_lname"];
$system->user_system_email = $data["user_system_email"];
$system->user_system_role_id = $data["user_system_role_id"];
$system->user_system_created = date("Y-m-d H:i:s");
$system->user_system_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($system, $system->user_system_fname);

$query = checkCreate($system);

returnSuccess($system, "system", $query);
