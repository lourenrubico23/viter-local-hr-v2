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
