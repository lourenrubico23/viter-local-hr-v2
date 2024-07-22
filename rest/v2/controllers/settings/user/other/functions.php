<?php

// Read all
function checkReadAllRole($object)
{
    $query = $object->readAllRole();
    checkQuery($query, "Empty records. (read All)");
    return $query;
}
