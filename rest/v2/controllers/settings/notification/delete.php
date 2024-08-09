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
  // get data
  $notification->notification_aid = $_GET['notificationid'];
  checkId($notification->notification_aid);

  $query = checkDelete($notification);

  returnSuccess($notification, "notification", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
