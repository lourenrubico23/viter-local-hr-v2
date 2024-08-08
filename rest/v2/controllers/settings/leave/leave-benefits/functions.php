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

// compare name
function compareIdName(
    $object,
    $jobLevelIdOld,
    $jobLevelId,
    $jobTitleIdOld,
    $jobTitleId,
    $leaveTypeIdOld,
    $leaveTypeId,
    $name
) {
    if (
        strtolower($jobLevelIdOld) !=  strtolower($jobLevelId) ||
        strtolower($jobTitleIdOld) !=  strtolower($jobTitleId) ||
        strtolower($leaveTypeIdOld) !=  strtolower($leaveTypeId)
    ) {
        isNameExist($object, $name);
    }
}
