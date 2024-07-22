<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$other = new Other($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("otherid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $other->user_other_aid = $_GET['otherid'];
  $other->user_other_fname = checkIndex($data, "user_other_fname");
  $other->user_other_lname = checkIndex($data, "user_other_lname");
  $other->user_other_email = checkIndex($data, "user_other_email");
  $other->user_other_role_id = checkIndex($data, "user_other_role_id");


  $other->user_other_datetime = date("Y-m-d H:i:s");
  checkId($other->user_other_aid);


  //checks current data to avoid same entries from being updated
  $user_other_fname_old = checkIndex($data, 'user_other_fname_old');
  compareName($other, $user_other_fname_old, $other->user_other_fname);

  // update
  $query = checkUpdate($other);
  returnSuccess($other, "other", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
