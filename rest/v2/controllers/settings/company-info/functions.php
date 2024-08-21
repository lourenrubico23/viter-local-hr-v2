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

// filter by search features
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// compare name for subscriber, para ito sa update para text and ilalabas ng toast at hindi id
function compareNameSubscriber(
    $object,
    $subscriberIdOld,
    $subscriberId,
    $name
) {
    if (
        strtolower($subscriberIdOld) !=  strtolower($subscriberId)
    ) {
        isNameExist($object, $name);
    }
}

