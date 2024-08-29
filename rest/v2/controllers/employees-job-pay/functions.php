<?php

// Update 
function checkUpdatePayInfo($object)
{
    $query = $object->updatePayInfo();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}

// filter by filter job title
function checkFilterJobTitle($object)
{
    $query = $object->filterJobTitle();
    checkQuery($query, "Empty records. (filter by job title)");
    return $query;
}

// filter by filter job level
function checkFilterJobLevel($object)
{
    $query = $object->filterJobLevel();
    checkQuery($query, "Empty records. (filter by job level)");
    return $query;
}

// filter by filter department
function checkFilterDepartment($object)
{
    $query = $object->filterDepartment();
    checkQuery($query, "Empty records. (filter by job department)");
    return $query;
}
