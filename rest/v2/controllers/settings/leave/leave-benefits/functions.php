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
    checkQuery($query, "Empty records. (filter by status and search)");
    return $query;
}

// filter by filter Job Title
function checkFilterJobTitle($object)
{
    $query = $object->filterJobTitle();
    checkQuery($query, "Empty records. (filter by job title)");
    return $query;
}

// filter by filter Job Level
function checkFilterJobLevel($object)
{
    $query = $object->filterJobLevel();
    checkQuery($query, "Empty records. (filter by job level)");
    return $query;
}

// compare name of job level, job title, and subscriber
function compareIdName(
    $object,
    $jobLevelIdOld,
    $jobLevelId,
    $jobTitleIdOld,
    $jobTitleId,
    $leaveTypeIdOld,
    $leaveTypeId,
    $subscriberIdOld,
    $subscriberId,
    $name
) {
    if (
        strtolower($jobLevelIdOld) !=  strtolower($jobLevelId) ||
        strtolower($jobTitleIdOld) !=  strtolower($jobTitleId) ||
        strtolower($leaveTypeIdOld) !=  strtolower($leaveTypeId) ||
        strtolower($subscriberIdOld) !=  strtolower($subscriberId)
    ) {
        isNameExist($object, $name);
    }
}


// filter by search subscribers
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}
