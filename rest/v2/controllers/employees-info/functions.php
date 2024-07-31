<?php

// Update 
function checkUpdateFamilyInfo($object)
{
    $query = $object->updateFamilyInfo();
    checkQuery($query, "There's a problem processing your request. (update)");
    return $query;
}