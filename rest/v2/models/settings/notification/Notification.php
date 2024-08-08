<?php

class Notification
{
    public $notification_aid;
    public $notification_is_active;
    public $notification_subscriber;
    public $notification_employee_name;
    public $notification_purpose;
    public $notification_email;
    public $notification_created;
    public $notification_datetime;

    public $connection;
    public $lastInsertedId;
    public $notification_start;
    public $notification_total;
    public $notification_search;

    public $tblNotification;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblNotification = "hris_notification";
    }

    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblNotification} ";
            $sql .= "order by notification_is_active desc, ";
            $sql .= "notification_employee_name asc, ";
            $sql .= "notification_purpose asc ";
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
            $sql .= "{$this->tblNotification} ";
            $sql .= "order by notification_is_active desc, ";
            $sql .= "notification_employee_name asc, ";
            $sql .= "notification_purpose asc "; //para nasa baba ng table ang mga inactive or archived
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->notification_start - 1,
                "total" => $this->notification_total,
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
            $sql .= "from {$this->tblNotification} ";
            $sql .= "where notification_subscriber like :notification_subscriber ";
            $sql .= "and (notification_employee_name like :notification_employee_name ";
            $sql .= "or notification_purpose like :notification_purpose ";
            $sql .= "or notification_email like :notification_email) ";
            $sql .= "order by notification_is_active desc, ";
            $sql .= "notification_employee_name asc, ";
            $sql .= "notification_purpose asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_subscriber" => "%{$this->notification_search}%",
                "notification_employee_name" => "%{$this->notification_search}%",
                "notification_purpose" => "%{$this->notification_search}%",
                "notification_email" => "%{$this->notification_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblNotification}";
            $sql .= "(notification_is_active, ";
            $sql .= "notification_subscriber, ";
            $sql .= "notification_employee_name, ";
            $sql .= "notification_purpose, ";
            $sql .= "notification_email, ";
            $sql .= "notification_created, ";
            $sql .= "notification_datetime ) values ( ";
            $sql .= ":notification_is_active, ";
            $sql .= ":notification_subscriber, ";
            $sql .= ":notification_employee_name, ";
            $sql .= ":notification_purpose, ";
            $sql .= ":notification_email, ";
            $sql .= ":notification_created, ";
            $sql .= ":notification_datetime )";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_subscriber" => $this->notification_subscriber,
                "notification_employee_name" => $this->notification_employee_name,
                "notification_purpose" => $this->notification_purpose,
                "notification_email" => $this->notification_email,
                "notification_created" => $this->notification_created,
                "notification_datetime" => $this->notification_datetime,
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
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_subscriber = :notification_subscriber, ";
            $sql .= "notification_employee_name = :notification_employee_name, ";
            $sql .= "notification_purpose = :notification_purpose, ";
            $sql .= "notification_email = :notification_email, ";
            $sql .= "notification_datetime = :notification_datetime ";
            $sql .= "where notification_aid = :notification_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_subscriber" => $this->notification_subscriber,
                "notification_employee_name" => $this->notification_employee_name,
                "notification_purpose" => $this->notification_purpose,
                "notification_email" => $this->notification_email,
                "notification_datetime" => $this->notification_datetime,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblNotification} ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblNotification} set ";
            $sql .= "notification_is_active = :notification_is_active, ";
            $sql .= "notification_datetime = :notification_datetime ";
            $sql .= "where notification_aid = :notification_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_is_active" => $this->notification_is_active,
                "notification_datetime" => $this->notification_datetime,
                "notification_aid" => $this->notification_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkName()
    {
        try {
            $sql = "select notification_aid from {$this->tblNotification} ";
            $sql .= "where notification_employee_name = :notification_employee_name ";
            $sql .= "and notification_purpose = :notification_purpose ";
            $sql .= "and notification_email = :notification_email ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notification_employee_name" => "{$this->notification_employee_name}",
                "notification_purpose" => "{$this->notification_purpose}",
                "notification_email" => "{$this->notification_email}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
