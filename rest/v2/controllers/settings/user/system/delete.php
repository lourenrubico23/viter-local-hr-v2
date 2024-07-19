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
  // get data
  $system->user_system_aid = $_GET['systemid'];
  checkId($system->user_system_aid);
  

  $query = checkDelete($system);

  returnSuccess($system, "system", $query);
}

// return 404 error if endpoint not available
checkEndpoint();