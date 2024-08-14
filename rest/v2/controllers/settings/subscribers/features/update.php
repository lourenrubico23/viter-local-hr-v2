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
  // check data
  checkPayload($data);
  // get data
  $features->features_aid = $_GET['featuresid'];
  $features->features_name = checkIndex($data, "features_name");
  $features->features_code = checkIndex($data, "features_code");

  $features->features_datetime = date("Y-m-d H:i:s");
  checkId($features->features_aid);


  //checks current data to avoid same entries from being updated
  $features_name_old = checkIndex($data, 'features_name_old');
  $features_code_old = checkIndex($data, 'features_code_old');
  compareName(
    $features,
    $features_code_old,
    $features->features_code
  );

  // update
  $query = checkUpdate($features);
  returnSuccess($features, "features", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
