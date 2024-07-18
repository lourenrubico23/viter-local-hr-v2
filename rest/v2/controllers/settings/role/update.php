<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$role = new Role($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("roleid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $role->user_role_aid = $_GET['roleid'];
  $role->user_role_name = checkIndex($data, "user_role_name");

  $role->user_role_datetime = date("Y-m-d H:i:s");
  checkId($role->user_role_aid);


  //checks current data to avoid same entries from being updated
  $user_role_name_old = checkIndex($data, 'user_role_name_old');
  compareName($role, $user_role_name_old, $role->user_role_name);

  // update
  $query = checkUpdate($role);
  returnSuccess($role, "role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
