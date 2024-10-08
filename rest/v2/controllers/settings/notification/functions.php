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

// filter by search job level
function checkSearchEmployeeName($object)
{
    $query = $object->searchEmployeeName();
    checkQuery($query, "Empty records. (filter by search employees name)");
    return $query;
}

// filter by search features
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// filter by filter employee name
function checkFilterEmployeeName($object)
{
    $query = $object->filterEmployeeName();
    checkQuery($query, "Empty records. (filter by employee name)");
    return $query;
}

// compare name of employee, and purpose
function compareEmployeeIdPurpose(
    $object,
    $employeeIdOld,
    $employeeId,
    $purposeIdOld,
    $purposeId,
    $name
) {
    if (
        strtolower($employeeIdOld) !=  strtolower($employeeId) ||
        strtolower($purposeIdOld) !=  strtolower($purposeId) 
    ) {
        isNameExist($object, $name);
    }
}
