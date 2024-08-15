<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$addons = new Addons($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("addonsid", $_GET)) {
  // get data
  $addons->addons_aid = $_GET['addonsid'];
  checkId($addons->addons_aid);

  $query = checkDelete($addons);

  returnSuccess($addons, "addons", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
