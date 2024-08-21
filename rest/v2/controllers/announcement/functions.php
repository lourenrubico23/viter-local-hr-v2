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
    checkQuery($query, "Empty records. (filter by status)");
    return $query;
}

// filter by search features
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// //compare name of date and title
// function compareDateTitle(
//     $object,
//     $dateIdOld,
//     $dateId,
//     $titleIdOld,
//     $titleId,
//     $name
// ) {
//     if (
//         strtolower($dateIdOld) != strtolower($dateId) ||
//         strtolower($titleIdOld) != strtolower($titleId)
//     ) {
//         isNameExist($object, $name);
//     }
// }
