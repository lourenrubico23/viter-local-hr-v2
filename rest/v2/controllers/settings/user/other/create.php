<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$other = new Other($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$other->user_other_is_active = 1;
$other->user_other_fname = checkIndex($data, "user_other_fname");
$other->user_other_lname = checkIndex($data, "user_other_lname");
$other->user_other_email = checkIndex($data, "user_other_email");
$other->user_other_role_id = checkIndex($data, "user_other_role_id");
$other->user_other_created = date("Y-m-d H:i:s");
$other->user_other_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($other, $other->user_other_fname);

$query = checkCreate($other);

returnSuccess($other, "other", $query);
