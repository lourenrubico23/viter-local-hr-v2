<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("announcementid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $announcement->announcement_aid = $_GET['announcementid'];
  $announcement->announcement_subscriber_id = checkIndex($data, "announcement_subscriber_id");
  $announcement->announcement_subscriber_code = checkIndex($data, "announcement_subscriber_code");
  $announcement->announcement_date = checkIndex($data, "announcement_date");
  $announcement->announcement_title = checkIndex($data, "announcement_title");
  $announcement->announcement_description = checkIndex($data, "announcement_description");

  $announcement->announcement_datetime = date("Y-m-d H:i:s");
  checkId($announcement->announcement_aid);


  //checks current data to avoid same entries from being updated
  $announcement_title_old = checkIndex($data, 'announcement_title_old');
  $announcement_date_old = checkIndex($data, 'announcement_date_old');
  compareTwoValues(
    $announcement,
    $announcement_title_old,
    $announcement->announcement_title,
    $announcement_date_old,
    $announcement->announcement_date
  );

  // update
  $query = checkUpdate($announcement);
  returnSuccess($announcement, "announcement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
