<?php


// Filter by status
function checkFilterByStatus($object)
{
    $query = $object->filterByStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter and search 
function checkFilterByStatusDepartmentAndSearch($object)
{
    $query = $object->filterByStatusDepartmentAndSearch();
    checkQuery($query, "Empty records. (filter by status, department and search)");
    return $query;
}

// Filter by department
function checkFilterByDepartment($object)
{
    $query = $object->filterByDepartment();
    checkQuery($query, "Empty records. (filter by department)");
    return $query;
}

// status and department
function checkFilterByStatusAndDepartment($object)
{
    $query = $object->filterByStatusAndDepartment();
    checkQuery($query, "Empty records. (filter by status and department)");
    return $query;
}

// Filter by department and search
function checkSearchAndDepartment($object)
{
    $query = $object->searchAndDepartment();
    checkQuery($query, "Empty records. (filter by search and department)");
    return $query;
}

// Filter by status and search
function checkSearchAndStatus($object)
{
    $query = $object->searchAndStatus();
    checkQuery($query, "Empty records. (filter by status and search)");
    return $query;
}

// association with notification employees name
function isAssociatedNotificationEmployeesName($object)
{
    $query = $object->checkAssociationNotificationEmployeesName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// filter by search subscribers
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

