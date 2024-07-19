<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$admin = new Admin($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("adminid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $admin->user_admin_aid = $_GET['adminid'];
  $admin->user_admin_fname = checkIndex($data, "user_admin_fname");
  $admin->user_admin_lname = checkIndex($data, "user_admin_lname");
  $admin->user_admin_email = checkIndex($data, "user_admin_email");


  $admin->user_admin_datetime = date("Y-m-d H:i:s");
  checkId($admin->user_admin_aid);


  //checks current data to avoid same entries from being updated
  $user_admin_fname_old = checkIndex($data, 'user_admin_fname_old');
  compareName($admin, $user_admin_fname_old, $admin->user_admin_fname);

  // update
  $query = checkUpdate($admin);
  returnSuccess($admin, "admin", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
