<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$system = new System($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("systemid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $system->user_system_aid = $_GET['systemid'];
  $system->user_system_fname = checkIndex($data, "user_system_fname");
  $system->user_system_lname = checkIndex($data, "user_system_lname");
  $system->user_system_email = checkIndex($data, "user_system_email");
  $system->user_system_role_id = checkIndex($data, "user_system_role_id");

  $system->user_system_datetime = date("Y-m-d H:i:s");
  checkId($system->user_system_aid);


  //checks current data to avoid same entries from being updated
  $user_system_fname_old = checkIndex($data, 'user_system_fname_old');
  compareName($system, $user_system_fname_old, $system->user_system_fname);

  // update
  $query = checkUpdate($system);
  returnSuccess($system, "system", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
