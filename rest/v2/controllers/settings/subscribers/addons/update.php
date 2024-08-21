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
  // check data
  checkPayload($data);
  // get data
  $addons->addons_aid = $_GET['addonsid'];
  $addons->addons_feature_code_id = checkIndex($data, "addons_feature_code_id");
  $addons->addons_subscriber_id = checkIndex($data, "addons_subscriber_id");
  $addons->addons_subscriber_code = checkIndex($data, "addons_subscriber_code");

  $addons->addons_datetime = date("Y-m-d H:i:s");
  checkId($addons->addons_aid);


  //checks current data to avoid same entries from being updated
  $addons_feature_code_id_old = checkIndex($data, 'addons_feature_code_id_old');
  $featuresName = checkIndex($data, "featuresName");
  compareName(
    $addons,
    $addons_feature_code_id_old,
    $addons->addons_feature_code_id,
    $featuresName
  );

  // update
  $query = checkUpdate($addons);
  returnSuccess($addons, "addons", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
