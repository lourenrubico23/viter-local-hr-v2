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
  // get data
  $role->user_role_aid = $_GET['roleid'];
  checkId($role->user_role_aid);
  isAssociatedSystemRoleName($role);
  isAssociatedOtherRoleName($role);

  $query = checkDelete($role);

  returnSuccess($role, "role", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
