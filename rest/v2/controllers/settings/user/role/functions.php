<?php

// check association
function isAssociatedRoleName($object)
{
    $query = $object->checkAssociationRoleName();
    $count = $query->rowCount();
    checkExistence($count, "You cannot delete this item because it is already associated with other module.");
}
