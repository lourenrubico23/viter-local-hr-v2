<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$notification = new Notification($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("notificationid", $_GET)) {
  $notification->notification_aid = $_GET['notificationid'];
  checkId($notification->notification_aid);
  $query = checkReadById($notification);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($notification);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();