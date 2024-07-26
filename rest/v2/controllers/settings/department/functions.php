<?php

// Read all
function checkFilterByStatus($object)
{
    $query = $object->filterByStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// Read all
function checkFilterByStatusAndSearch($object)
{
    $query = $object->filterByStatusAndSearch();
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