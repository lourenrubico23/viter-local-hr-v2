<?php

class System
{
    public $user_system_aid;
    public $user_system_is_active;
    public $user_system_fname;
    public $user_system_lname;
    public $user_system_email;
    public $user_system_role_id;
    public $user_system_created;
    public $user_system_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_system_start;
    public $user_system_total;
    public $user_system_search;

    public $tblUserSystem;
    public $tblUserRole;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserSystem = "hris_user_system";
        $this->tblUserRole = "hris_user_role";
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblUserSystem} as sys, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where sys.user_system_role_id = role.user_role_aid ";
            $sql .= "order by sys.user_system_is_active desc, ";
            $sql .= "user_system_fname asc, ";
            $sql .= "user_system_lname asc ";
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
            $sql .= "{$this->tblUserSystem} ";
            // $sql .= "{$this->tblUserRole} as role ";
            // $sql .= "where sys.user_system_role_id = role.user_role_aid ";
            $sql .= "order by user_system_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "user_system_fname asc, ";
            $sql .= "user_system_lname asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_system_start - 1,
                "total" => $this->user_system_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblUserSystem} as sys, ";
            $sql .= "{$this->tblUserRole} as role ";
            $sql .= "where sys.user_system_role_id = role.user_role_aid ";
            $sql .= "and sys.user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblUserSystem} ";
            $sql .= "where user_system_fname = user_system_fname ";
            $sql .= "and (concat(user_system_fname, ' ',user_system_lname) like :full_name ";
            $sql .= "or user_system_fname like :user_system_fname ";
            $sql .= "or user_system_lname like :user_system_lname ";
            $sql .= "or user_system_email like :user_system_email) ";
            $sql .= "order by user_system_is_active desc, ";
            $sql .= "user_system_fname asc, ";
            $sql .= "user_system_lname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "full_name" => "%{$this->user_system_search}%",
                "user_system_fname" => "%{$this->user_system_search}%",
                "user_system_lname" => "%{$this->user_system_search}%",
                "user_system_email" => "%{$this->user_system_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserSystem}";
            $sql .= "(user_system_is_active, ";
            $sql .= "user_system_fname, ";
            $sql .= "user_system_lname, ";
            $sql .= "user_system_email, ";
            $sql .= "user_system_role_id, ";
            $sql .= "user_system_created, ";
            $sql .= "user_system_datetime ) values ( ";
            $sql .= ":user_system_is_active, ";
            $sql .= ":user_system_fname, ";
            $sql .= ":user_system_lname, ";
            $sql .= ":user_system_email, ";
            $sql .= ":user_system_role_id, ";
            $sql .= ":user_system_created, ";
            $sql .= ":user_system_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_is_active" => $this->user_system_is_active,
                "user_system_fname" => $this->user_system_fname,
                "user_system_lname" => $this->user_system_lname,
                "user_system_email" => $this->user_system_email,
                "user_system_role_id" => $this->user_system_role_id,
                "user_system_created" => $this->user_system_created,
                "user_system_datetime" => $this->user_system_datetime,
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
            $sql = "update {$this->tblUserSystem} set ";
            $sql .= "user_system_fname = :user_system_fname, ";
            $sql .= "user_system_lname = :user_system_lname, ";
            $sql .= "user_system_email = :user_system_email, ";
            $sql .= "user_system_datetime = :user_system_datetime ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_fname" => $this->user_system_fname,
                "user_system_lname" => $this->user_system_lname,
                "user_system_email" => $this->user_system_email,
                "user_system_datetime" => $this->user_system_datetime,
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblUserSystem} ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblUserSystem} set ";
            $sql .= "user_system_is_active = :user_system_is_active, ";
            $sql .= "user_system_datetime = :user_system_datetime ";
            $sql .= "where user_system_aid = :user_system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_is_active" => $this->user_system_is_active,
                "user_system_datetime" => $this->user_system_datetime,
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select user_system_fname from {$this->tblUserSystem} ";
            $sql .= "where user_system_fname = :user_system_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_fname" => "{$this->user_system_fname}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
