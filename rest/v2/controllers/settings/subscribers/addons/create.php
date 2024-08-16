<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$addons = new Addons($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$addons->addons_is_active = 1;
$addons->addons_feature_code_id = checkIndex($data, "addons_feature_code_id");
$addons->addons_subscriber_id = checkIndex($data, "addons_subscriber_id");
$addons->addons_created = date("Y-m-d H:i:s");
$addons->addons_datetime = date("Y-m-d H:i:s");

// id to text convertion
$featuresName = checkIndex($data, "featuresName");
//checks newly added data if it already exists
isNameExist($addons, $featuresName);

$query = checkCreate($addons);

returnSuccess($addons, "addons", $query);
