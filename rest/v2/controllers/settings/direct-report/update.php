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
  // check data
  checkPayload($data);
  // get data
  $directReport->direct_report_aid = $_GET['direct_reportid'];
  $directReport->direct_report_subscriber_id = $data["direct_report_subscriber_id"];
  $directReport->direct_report_subscriber_code = $data["direct_report_subscriber_code"];
  $directReport->direct_report_supervisor_id = $data["direct_report_supervisor_id"];
  $directReport->direct_report_subordinate_id = $data["direct_report_subordinate_id"];
  $directReport->direct_report_supervisor_name = $data["direct_report_supervisor_name"];
  $directReport->direct_report_subordinate_name = $data["direct_report_subordinate_name"];


  $directReport->direct_report_datetime = date("Y-m-d H:i:s");
  checkId($directReport->direct_report_aid);


  // //checks current data to avoid same entries from being updated
  $directReport_supervisor_old = $data['direct_report_supervisor_id_old'];
  $directReport_subordinate_old = $data['direct_report_subordinate_id_old'];
  $employeeName = checkIndex($data, "employeeName");

  compareEmployeeIdSupervisorSubordinate(
    $directReport,
    $directReport_supervisor_old,
    $directReport->direct_report_supervisor_id,
    $directReport_subordinate_old,
    $directReport->direct_report_subordinate_id,
    $employeeName
  );

  // update
  $query = checkUpdate($directReport);
  returnSuccess($directReport, "direct_report", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
