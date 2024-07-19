<?php

class Admin
{
    public $user_admin_aid;
    public $user_admin_is_active;
    public $user_admin_fname;
    public $user_admin_lname;
    public $user_admin_email;
    public $user_admin_created;
    public $user_admin_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_admin_start;
    public $user_admin_total;
    public $user_admin_search;

    public $tblUserAdmin;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserAdmin = "hris_user_admin";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblUserAdmin} ";
            $sql .= "order by user_admin_is_active desc, ";
            $sql .= "user_admin_aid asc ";
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
            $sql .= "{$this->tblUserAdmin} ";
            $sql .= "order by user_admin_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "user_admin_aid asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->user_admin_start - 1,
                "total" => $this->user_admin_total,
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
            $sql .= "from {$this->tblUserAdmin} ";
            $sql .= "where user_admin_fname like :user_admin_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_fname" => "%{$this->user_admin_search}%",

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblUserAdmin}";
            $sql .= "(user_admin_is_active, ";
            $sql .= "user_admin_fname, ";
            $sql .= "user_admin_lname, ";
            $sql .= "user_admin_email, ";
            $sql .= "user_admin_created, ";
            $sql .= "user_admin_datetime ) values ( ";
            $sql .= ":user_admin_is_active, ";
            $sql .= ":user_admin_fname, ";
            $sql .= ":user_admin_lname, ";
            $sql .= ":user_admin_email, ";
            $sql .= ":user_admin_created, ";
            $sql .= ":user_admin_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_is_active" => $this->user_admin_is_active,
                "user_admin_fname" => $this->user_admin_fname,
                "user_admin_lname" => $this->user_admin_lname,
                "user_admin_email" => $this->user_admin_email,
                "user_admin_created" => $this->user_admin_created,
                "user_admin_datetime" => $this->user_admin_datetime,
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
            $sql = "update {$this->tblUserAdmin} set ";
            $sql .= "user_admin_fname = :user_admin_fname, ";
            $sql .= "user_admin_lname = :user_admin_lname, ";
            $sql .= "user_admin_email = :user_admin_email, ";
            $sql .= "user_admin_datetime = :user_admin_datetime ";
            $sql .= "where user_admin_aid = :user_admin_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_fname" => $this->user_admin_fname,
                "user_admin_lname" => $this->user_admin_lname,
                "user_admin_email" => $this->user_admin_email,
                "user_admin_datetime" => $this->user_admin_datetime,
                "user_admin_aid" => $this->user_admin_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblUserAdmin} ";
            $sql .= "where user_admin_aid = :user_admin_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_aid" => $this->user_admin_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblUserAdmin} set ";
            $sql .= "user_admin_is_active = :user_admin_is_active, ";
            $sql .= "user_admin_datetime = :user_admin_datetime ";
            $sql .= "where user_admin_aid = :user_admin_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_is_active" => $this->user_admin_is_active,
                "user_admin_datetime" => $this->user_admin_datetime,
                "user_admin_aid" => $this->user_admin_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select user_admin_fname from {$this->tblUserAdmin} ";
            $sql .= "where user_admin_fname = :user_admin_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_admin_fname" => "{$this->user_admin_fname}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
