<?php

// check association for user system role
function isAssociatedSystemRoleName($object)
{
    $query = $object->checkAssociationSystemRoleName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}

// check association for user other role
function isAssociatedOtherRoleName($object)
{
    $query = $object->checkAssociationOtherRoleName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}
