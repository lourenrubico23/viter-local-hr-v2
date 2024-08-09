<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$notification = new Notification($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$notification->notification_is_active = 1;
$notification->notification_subscriber = checkIndex($data, "notification_subscriber");
$notification->notification_employee_name_id = checkIndex($data, "notification_employee_name_id");
$notification->notification_purpose = checkIndex($data, "notification_purpose");
$notification->notification_email = checkIndex($data, "notification_email");
$notification->notification_created = date("Y-m-d H:i:s");
$notification->notification_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($notification, $notification->notification_employee_name_id);

$query = checkCreate($notification);

returnSuccess($notification, "notification", $query);
