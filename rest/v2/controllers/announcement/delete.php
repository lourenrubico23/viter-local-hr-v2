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
  // get data
  $announcement->announcement_aid = $_GET['announcementid'];
  checkId($announcement->announcement_aid);

  $query = checkDelete($announcement);

  returnSuccess($announcement, "announcement", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
