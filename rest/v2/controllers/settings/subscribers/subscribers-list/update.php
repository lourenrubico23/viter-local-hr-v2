<?php

// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("subscribersid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $subscribers->subscribers_aid = $_GET['subscribersid'];
  $subscribers->subscribers_subscription_type = checkIndex($data, "subscribers_subscription_type");
  $subscribers->subscribers_payment_type = checkIndex($data, "subscribers_payment_type");
  $subscribers->subscribers_date_start = checkIndex($data, "subscribers_date_start");
  $subscribers->subscribers_contact_fname = checkIndex($data, "subscribers_contact_fname");
  $subscribers->subscribers_contact_lname = checkIndex($data, "subscribers_contact_lname");
  $subscribers->subscribers_contact_number = checkIndex($data, "subscribers_contact_number");
  $subscribers->subscribers_contact_email = checkIndex($data, "subscribers_contact_email");
  $subscribers->subscribers_company_name = checkIndex($data, "subscribers_company_name");
  $subscribers->subscribers_total_employees = checkIndex($data, "subscribers_total_employees");
  $subscribers->subscribers_amount_per_employee = checkIndex($data, "subscribers_amount_per_employee");
  $subscribers->subscribers_address = checkIndex($data, "subscribers_address");

  $subscribers->subscribers_datetime = date("Y-m-d H:i:s");
  checkId($subscribers->subscribers_aid);


  //checks current data to avoid same entries from being updated
  $subscribers_company_name_old = checkIndex($data, 'subscribers_company_name_old');
  compareName($subscribers, $subscribers_company_name_old, $subscribers->subscribers_company_name);

  // update
  $query = checkUpdate($subscribers);
  $subscribers->subscribers_log_subscriber_code = checkIndex($data, 'subscribers_code');
  $subscribers->subscribers_log_subscriber_id = $subscribers->subscribers_aid ;
  $subscribers->subscribers_log_subscriber_changes = "{$subscribers->subscribers_total_employees} employees";
  $subscribers_total_employees_old = checkIndex($data, 'subscribers_total_employees_old');
  compareSubscriberLog($subscribers, $subscribers_total_employees_old, $subscribers->subscribers_total_employees, $data);
  returnSuccess($subscribers, "subscribers", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
