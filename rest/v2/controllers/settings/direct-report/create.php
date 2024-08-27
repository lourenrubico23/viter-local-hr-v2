<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$directReport = new DirectReport($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$directReport->direct_report_is_active = 1;
$directReport->direct_report_subscriber_id = $data["direct_report_subscriber_id"];
$directReport->direct_report_subscriber_code = $data["direct_report_subscriber_code"];
$directReport->direct_report_supervisor_id = $data["direct_report_supervisor_id"];
$directReport->direct_report_subordinate_id = $data["direct_report_subordinate_id"];
$directReport->direct_report_supervisor_name = $data["direct_report_supervisor_name"];
$directReport->direct_report_subordinate_name = $data["direct_report_subordinate_name"];
$directReport->direct_report_created = date("Y-m-d H:i:s");
$directReport->direct_report_datetime = date("Y-m-d H:i:s");

// id to text convertion
$supervior = checkIndex($data, "supervior");
$subordinate = checkIndex($data, "subordinate");
//checks newly added data if it already exists
isNameExist($directReport, $supervior, $subordinate);


$query = checkCreate($directReport);

returnSuccess($directReport, "direct_report", $query);
