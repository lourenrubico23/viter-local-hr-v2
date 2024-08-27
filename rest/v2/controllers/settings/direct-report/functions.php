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

// // filter by search subscriber
// function checkSearchEmployeeName($object)
// {
//     $query = $object->searchEmployeeName();
//     checkQuery($query, "Empty records. (filter by search employees name)");
//     return $query;
// }

// filter by search subscriber
function checkSearchSubcribers($object)
{
    $query = $object->searchSubcribers();
    checkQuery($query, "Empty records. (filter by search subscribers)");
    return $query;
}

// filter by filter employee name
function checkFilterEmployeeName($object)
{
    $query = $object->filterEmployees();
    checkQuery($query, "Empty records. (filter by employee name)");
    return $query;
}

// compare name of supervisor id and subordinate id
function compareEmployeeIdSupervisorSubordinate(
    $object,
    $supervisorIdOld,
    $supervisorId,
    $subordinateIdOld,
    $subordinateId,
    $name
) {
    if (
        strtolower($supervisorIdOld) !=  strtolower($supervisorId) ||
        strtolower($subordinateIdOld) !=  strtolower($subordinateId) 
    ) {
        isNameExist($object, $name);
    }
}

// subordinate and supervisor cannot be the same
function compareSupervisorSubordinate(
    $object,
    $supervisorName,
    $subordinadeName,
    $name
) {
    if (
        strtolower($supervisorName) != strtolower($subordinadeName)
    ) {
        isNameExist($object, $name);
    }
}

