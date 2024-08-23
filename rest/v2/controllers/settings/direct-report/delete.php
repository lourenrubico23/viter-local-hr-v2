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
  // get data
  $directReport->direct_report_aid = $_GET['direct_reportid'];
  checkId($directReport->direct_report_aid);

  $query = checkDelete($directReport);

  returnSuccess($directReport, "direct_report", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
