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
  // get data
  $admin->user_admin_aid = $_GET['adminid'];
  checkId($admin->user_admin_aid);
  

  $query = checkDelete($admin);

  returnSuccess($admin, "admin", $query);
}

// return 404 error if endpoint not available
checkEndpoint();