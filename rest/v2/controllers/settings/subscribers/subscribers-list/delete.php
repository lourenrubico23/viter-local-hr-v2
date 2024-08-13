<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("subscribersid", $_GET)) {
  // get data
  $subscribers->subscribers_aid = $_GET['subscribersid'];
  checkId($subscribers->subscribers_aid);

  $query = checkDelete($subscribers);

  returnSuccess($subscribers, "subscribers", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
