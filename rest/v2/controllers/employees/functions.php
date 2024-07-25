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
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// Filter by status
function checkFilterByDepartment($object)
{
    $query = $object->filterByDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter and search 
function checkFilterByStatusAndDepartment($object)
{
    $query = $object->filterByStatusAndDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// Filter by status
function checkSearchAndDepartment($object)
{
    $query = $object->searchAndDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter and search 
function checkFilterSearchAndStatus($object)
{
    $query = $object->filterSearchAndStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}
