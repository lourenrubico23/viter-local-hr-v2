<?php

// filter by status
function checkFilterByStatus($object)
{
    $query = $object->filterByStatus();
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter by search subscriber
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// Filter by subscriber code
function checkFilterBySubscriberCode($object)
{
    $query = $object->filterBySubscriberCode();
    checkQuery($query, "Empty records. (filter by subscriber code)");
    return $query;
}

// Filter by subscriber code, search and status
function checkFilterByStatusSubscriberCodeAndSearch($object)
{
    $query = $object->filteByStatusSubscriberCodeAndSearch();
    checkQuery($query, "Empty records. (filter by subscriber code, search, and status)");
    return $query;
}

// Filter by subscriber code and status
function checkFilterByStatusAndSubscriberCode($object)
{
    $query = $object->filteByStatusAndSubscriberCode();
    checkQuery($query, "Empty records. (filter by subscriber code and status)");
    return $query;
}

// Filter by subscriber code and search
function checkFilterBySubscriberCodeAndSearch($object)
{
    $query = $object->filteBySubscriberCodeAndSearch();
    checkQuery($query, "Empty records. (filter by subscriber code and search)");
    return $query;
}

// Filter by status and search
function checkSearchAndStatus($object)
{
    $query = $object->searchAndStatus();
    checkQuery($query, "Empty records. (filter by status and search)");
    return $query;
}