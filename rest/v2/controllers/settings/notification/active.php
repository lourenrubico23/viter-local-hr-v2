<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/settings/notification/Notification.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$notification = new Notification($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("notificationid", $_GET)) {
    // check data
    checkPayload($data);
    $notification->notification_aid = $_GET['notificationid'];
    $notification->notification_is_active = trim($data["isActive"]);
    $notification->notification_datetime = date("Y-m-d H:i:s");
    checkId($notification->notification_aid);
    $query = checkActive($notification);
    http_response_code(200);
    returnSuccess($notification, "notification", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
