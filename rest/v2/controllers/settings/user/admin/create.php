<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$admin = new Admin($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$admin->user_admin_is_active = 1;
$admin->user_admin_fname = checkIndex($data, "user_admin_fname");
$admin->user_admin_lname = checkIndex($data, "user_admin_lname");
$admin->user_admin_email = checkIndex($data, "user_admin_email");
$admin->user_admin_created = date("Y-m-d H:i:s");
$admin->user_admin_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($admin, $admin->user_admin_fname);

$query = checkCreate($admin);

returnSuccess($admin, "admin", $query);
