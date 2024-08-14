<?php

// filter by status
function checkFilterByStatus($object)
{
    $query = $object->filterByStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter by status and search
function checkFilterByStatusAndSearch($object)
{
    $query = $object->filterByStatusAndSearch();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

function setSubscriberCode($object)
{
    $subscriberCodeQuery = getResultData($object->checkSubscriberCode());
    checkQuery($object->checkSubscriberCode(), 'empty records. check subscriber code');
    if (count($subscriberCodeQuery) == 0) {
        $subCode = "FBS001";
        return $subCode;
    }

    // set the code number of subscriber
    $valSubscriber = intval(substr($subscriberCodeQuery[0]['subscribers_code'], 3));
    $subCode = (int)$valSubscriber + 1;
    if ((int)$valSubscriber < 9) {
        $subCode = "FBS00" . $subCode;
    } elseif ((int)$valSubscriber < 99) {
        $subCode = "FBS0" . $subCode;
    } else {
        $subCode = "FBS" . $subCode;
    }

    return $subCode;
}

// create subscribers log
function checkCreateSubscriberLog($object, $data)
{
    $object->subscribers_log_user_id = checkIndex($data, "subscribers_log_user_id");
    $object->subscribers_log_fname = checkIndex($data, "subscribers_log_fname");
    $object->subscribers_log_lname = checkIndex($data, "subscribers_log_lname");
    $object->subscribers_log_datetime = date("Y-m-d H:i:s");
    $object->subscribers_log_created = date("Y-m-d H:i:s");
    $query = $object->createSubscriberLog();
    checkQuery($query, "Empty records. (subscriber log)");
    return $query;
}

function compareSubscriberLog($object, $totalEmployeeOld, $totalEmployee, $data)
{
    if ($totalEmployeeOld != $totalEmployee) {
        $object->subscribers_log_subscriber_changes = "{$totalEmployee} employees";
        checkCreateSubscriberLog($object, $data);
    }
}

function checkReadAllSubscribersLogById($object)
{
    $query = $object->readAllSubscribersLogById();
    checkQuery($query, "There's a problem processing your request. (readAll SubscribersLog)");
    return $query;
}