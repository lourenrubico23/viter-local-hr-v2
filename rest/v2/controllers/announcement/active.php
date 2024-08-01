<?php
// set http header
require '../../core/header.php';
// use needed functions
require '../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../models/announcement/Announcement.php';
// get payload

// check database connection

$conn = null;
$conn = checkDbConnection();
// make instance of classes
$announcement = new Announcement($conn);
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
  //checkApiKey();
  if (array_key_exists("announcementid", $_GET)) {
    // check data
    checkPayload($data);
    $announcement->announcement_aid = $_GET['announcementid'];
    $announcement->announcement_is_active = trim($data["isActive"]);
    $announcement->announcement_datetime = date("Y-m-d H:i:s");
    checkId($announcement->announcement_aid);
    $query = checkActive($announcement);
    http_response_code(200);
    returnSuccess($announcement, "announcement", $query);
  }
  // return 404 error if endpoint not available
  checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();
