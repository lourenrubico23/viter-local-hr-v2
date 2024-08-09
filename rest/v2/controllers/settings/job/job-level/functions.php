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

// association with job title 
function isAssociatedJobTitleJobLevelName($object)
{
    $query = $object->checkAssociationJobTitleJobLevelName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// association with leave Benefits 
function isAssociatedLeaveBenefitsJobLevelName($object)
{
    $query = $object->checkAssociationLeaveBenefitsJobLevelName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}
