<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$directReport = new DirectReport($conn);
// get $_GET data
$error = [];
$returnData = [];

if (array_key_exists("direct_reportid", $_GET)) {
  $directReport->direct_report_aid = $_GET['direct_reportid'];
  checkId($directReport->direct_report_aid);
  $query = checkReadById($directReport);
  http_response_code(200);
  getQueriedData($query);
}

if (empty($_GET)) {
  $query = checkReadAll($directReport);
  http_response_code(200);
  getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();