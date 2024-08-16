<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$features = new Features($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("featuresid", $_GET)) {
  // get data
  $features->features_aid = $_GET['featuresid'];
  checkId($features->features_aid);
  isAssociatedAddonsFeaturesCode($features);

  $query = checkDelete($features);

  returnSuccess($features, "features", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
