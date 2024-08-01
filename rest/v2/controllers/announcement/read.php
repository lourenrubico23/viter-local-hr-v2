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
  $announcement->announcement_aid = $_GET['announcementid'];
  checkId($announcement->announcement_aid);
  $query = checkReadById($announcement);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($announcement);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();