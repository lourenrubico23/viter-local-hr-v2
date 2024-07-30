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

// Filter by department
function checkFilterByDepartment($object)
{
    $query = $object->filterByDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// status and department
function checkFilterByStatusAndDepartment($object)
{
    $query = $object->filterByStatusAndDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// Filter by department and search
function checkSearchAndDepartment($object)
{
    $query = $object->searchAndDepartment();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// Filter by status and search
function checkSearchAndStatus($object)
{
    $query = $object->searchAndStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// create for employees info
function checkCreateEmployeeInfo($object)
{
    $query = $object->createEmployeeInfo();
    checkQuery($query, "There's a problem processing your request. (create info)");
    return $query;
}
