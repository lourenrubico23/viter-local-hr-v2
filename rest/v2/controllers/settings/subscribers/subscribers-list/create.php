<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$subscribers = new Subscribers($conn);
// get should not be present

// check data
checkPayload($data);
// get data
$subscribers->subscribers_is_active = 1;

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
$subscribers->subscribers_created = date("Y-m-d H:i:s");
$subscribers->subscribers_datetime = date("Y-m-d H:i:s");

//checks newly added data if it already exists
isNameExist($subscribers, $subscribers->subscribers_company_name);
$subscribers->subscribers_code = setSubscriberCode($subscribers);
$query = checkCreate($subscribers);
$subscribers->subscribers_log_subscriber_code = $subscribers->subscribers_code;
$subscribers->subscribers_log_subscriber_id = $subscribers->lastInsertedId;
$subscribers->subscribers_log_subscriber_changes = "{$subscribers->subscribers_total_employees} employees";
checkCreateSubscriberLog($subscribers,$data);
returnSuccess($subscribers, "subscribers", $query);
