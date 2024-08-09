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
