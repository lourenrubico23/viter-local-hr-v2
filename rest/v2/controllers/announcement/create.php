<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new announcement($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$announcement->announcement_is_active = 1;
$announcement->announcement_subscriber = checkIndex($data, "announcement_subscriber");
$announcement->announcement_date = checkIndex($data, "announcement_date");
$announcement->announcement_title = checkIndex($data, "announcement_title");
$announcement->announcement_description = checkIndex($data, "announcement_description");
$announcement->announcement_created = date("Y-m-d H:i:s");
$announcement->announcement_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($announcement, $announcement->announcement_title);

$query = checkCreate($announcement);

returnSuccess($announcement, "announcement", $query);
