<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$features = new Features($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$features->features_is_active = 1;

$features->features_name = checkIndex($data, "features_name");
$features->features_code = checkIndex($data, "features_code");
$features->features_created = date("Y-m-d H:i:s");
$features->features_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist(
    $features,
    $features->features_code
);
$query = checkCreate($features);
returnSuccess($features, "features", $query);
