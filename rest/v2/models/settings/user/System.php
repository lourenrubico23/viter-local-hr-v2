<?php

class System
{
    public $user_system_aid;
    public $user_system_is_active;
    public $user_system_name;
    public $user_system_email;
    public $user_system_created;
    public $user_system_datetime;

    public $connection;
    public $lastInsertedId;
    public $user_system_start;
    public $user_system_total;
    public $user_system_search;

    public $tblUserSystem;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblUserSystem = "hris_user_system";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblUserSystem} ";
            $sql .= "order by user_system_is_active desc, ";
            $sql .= "user_system_aid asc ";
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
            $sql .= "order by user_system_is_active desc, "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "user_system_aid asc ";
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

    public function search()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblUserSystem} ";
            $sql .= "where user_system_name like :user_system_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_name" => "%{$this->user_system_search}%",

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
            $sql .= "user_system_name, ";
            $sql .= "user_system_email, ";
            $sql .= "user_system_created, ";
            $sql .= "user_system_datetime ) values ( ";
            $sql .= ":user_system_is_active, ";
            $sql .= ":user_system_name, ";
            $sql .= ":user_system_email, ";
            $sql .= ":user_system_created, ";
            $sql .= ":user_system_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_is_active" => $this->user_system_is_active,
                "user_system_name" => $this->user_system_name,
                "user_system_email" => $this->user_system_email,
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
            $sql .= "user_system_name = :user_system_name, ";
            $sql .= "user_system_email = :user_system_email, ";
            $sql .= "user_system_lastname = :user_system_lastname, ";
            $sql .= "user_system_datetime = :user_system_datetime ";
            $sql .= "where user_system_aid = :user_system_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "user_system_name" => $this->user_system_name,
                "user_system_datetime" => $this->user_system_datetime,
                "user_system_aid" => $this->user_system_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
