<?php

class Role
{
    public $user_role_aid;
    public $user_role_is_active;
    public $user_role_name;
    public $user_role_description;
    public $user_role_created;
    public $user_role_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_role_start;
    public $user_role_total;
    public $user_role_search;

    public $tblUserRole;
    public $tblUserSystem;
    public $tblUserOther;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserRole = "hris_user_role";
        $this->tblUserSystem = "hris_user_system";
        $this->tblUserOther = "hris_user_other";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblUserRole} ";
            $sql .= "order by user_role_is_active desc, ";
            $sql .= "user_role_aid asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblUserRole} ";
            $sql .= "order by user_role_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "user_role_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_role_start - 1,
                "total" => $this->user_role_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserRole}";
            $sql .= "(user_role_is_active, ";
            $sql .= "user_role_name, ";
            $sql .= "user_role_description, ";
            $sql .= "user_role_created, ";
            $sql .= "user_role_datetime ) values ( ";
            $sql .= ":user_role_is_active, ";
            $sql .= ":user_role_name, ";
            $sql .= ":user_role_description, ";
            $sql .= ":user_role_created, ";
            $sql .= ":user_role_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_role_is_active" => $this->user_role_is_active,
                "user_role_name" => $this->user_role_name,
                "user_role_description" => $this->user_role_description,
                "user_role_created" => $this->user_role_created,
                "user_role_datetime" => $this->user_role_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblUserRole} set ";
            $sql .= "user_role_name = :user_role_name, ";
            $sql .= "user_role_description = :user_role_description, ";
            $sql .= "user_role_datetime = :user_role_datetime ";
            $sql .= "where user_role_aid = :user_role_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_role_name" => $this->user_role_name,
                "user_role_description" => $this->user_role_description,
                "user_role_datetime" => $this->user_role_datetime,
                "user_role_aid" => $this->user_role_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblUserRole} ";
            $sql .= "where user_role_aid = :user_role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_role_aid" => $this->user_role_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblUserRole} set ";
            $sql .= "user_role_is_active = :user_role_is_active, ";
            $sql .= "user_role_datetime = :user_role_datetime ";
            $sql .= "where user_role_aid = :user_role_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_role_is_active" => $this->user_role_is_active,
                "user_role_datetime" => $this->user_role_datetime,
                "user_role_aid" => $this->user_role_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select user_role_name from {$this->tblUserRole} ";
            $sql .= "where user_role_name = :user_role_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_role_name" => "{$this->user_role_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkAssociationRoleName()
    {
        try {
            $sql = "select sys.user_system_role_id from {$this->tblUserSystem} ";
            $sql .= "where user_system_role_id = :user_system_role_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_role_id" => $this->user_role_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
