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
function checkSearchJobLevel($object)
{
    $query = $object->searchJobLevel();
    checkQuery($query, "Empty records. (filter by search job level)");
    return $query;
}

// filter by search subscribers
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// association with leave benefits job title name
function isAssociatedLeaveBenefitsJobTitleName($object)
{
    $query = $object->checkAssociationLeaveBenefitsJobTitleName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// filter by filter Job Level
function checkFilterJobLevel($object)
{
    $query = $object->filterJobLevel();
    checkQuery($query, "Empty records. (filter by job level)");
    return $query;
}


