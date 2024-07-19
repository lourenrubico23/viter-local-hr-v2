<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$role->user_role_is_active = 1;
$role->user_role_name = checkIndex($data, "user_role_name");
$role->user_role_description = $data["user_role_description"];
$role->user_role_created = date("Y-m-d H:i:s");
$role->user_role_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($role, $role->user_role_name);

$query = checkCreate($role);

returnSuccess($role, "role", $query);
