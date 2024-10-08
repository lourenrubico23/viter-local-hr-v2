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
  // check data
  checkPayload($data);
  // get data
  $notification->notification_aid = $_GET['notificationid'];
  $notification->notification_subscriber_id = checkIndex($data, "notification_subscriber_id");
  $notification->notification_subscriber_code = checkIndex($data, "notification_subscriber_code");
  $notification->notification_employee_name_id = checkIndex($data, "notification_employee_name_id");
  $notification->notification_purpose = checkIndex($data, "notification_purpose");
  $notification->notification_email = checkIndex($data, "notification_email");


  $notification->notification_datetime = date("Y-m-d H:i:s");
  checkId($notification->notification_aid);


  // //checks current data to avoid same entries from being updated
  $notification_employee_name_id_old = checkIndex($data, 'notification_employee_name_id_old');
  $notification_purpose_old = checkIndex($data, 'notification_purpose_old');
  $employeeName = checkIndex($data, "employeeName");

  compareEmployeeIdPurpose(
    $notification,
    $notification_employee_name_id_old,
    $notification->notification_employee_name_id,
    $notification_purpose_old,
    $notification->notification_purpose,
    $employeeName
  );

  // update
  $query = checkUpdate($notification);
  returnSuccess($notification, "notification", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
